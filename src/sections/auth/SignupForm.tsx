import { useState, type FormEvent } from "react"
import FormAlert from "@/components/forms/FormAlert"
import PasswordField from "@/components/forms/PasswordField"
import SubmitButton from "@/components/forms/SubmitButton"
import TextField from "@/components/forms/TextField"
import { navigate } from "@/hooks/useHashRoute"
import { AuthError, signup } from "@/lib/authApi"
import { cx } from "@/lib/cx"
import {
  passwordStrength,
  validateEmail,
  validateNewPassword,
  validatePhone,
  validateRequired,
} from "@/lib/validation"
import AuthLayout from "@/sections/auth/AuthLayout"

type Field = "fullName" | "email" | "phone" | "password" | "confirmPassword"
type Values = Record<Field, string>

const STRENGTH_LABELS = ["Too weak", "Weak", "Fair", "Good", "Strong"]
const STRENGTH_COLORS = ["bg-danger", "bg-danger", "bg-amber-500", "bg-accent-teal", "bg-accent-teal"]

function validate(values: Values): Partial<Record<Field, string | null>> {
  return {
    fullName: validateRequired(values.fullName, "full name"),
    email: validateEmail(values.email),
    phone: validatePhone(values.phone),
    password: validateNewPassword(values.password),
    confirmPassword: !values.confirmPassword
      ? "Confirm your password."
      : values.confirmPassword !== values.password
        ? "Passwords don't match."
        : null,
  }
}

export default function SignupForm() {
  const [values, setValues] = useState<Values>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Partial<Record<Field, string | null>>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const set = (field: Field) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((current) => ({ ...current, [field]: event.target.value }))
    // Clear a field's error as soon as it's edited.
    if (errors[field]) setErrors((current) => ({ ...current, [field]: null }))
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const next = validate(values)
    setErrors(next)
    setFormError(null)
    if (Object.values(next).some(Boolean)) return

    setLoading(true)
    try {
      await signup({
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        password: values.password,
      })
      navigate("verify")
    } catch (error) {
      setFormError(error instanceof AuthError ? error.message : "Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  const strength = passwordStrength(values.password)

  return (
    <AuthLayout
      panel="signup"
      title="Create your account"
      subtitle={
        <>
          Already have an account?{" "}
          <a className="font-semibold text-accent-teal hover:underline" href="#/login">
            Log in
          </a>
        </>
      }
    >
      <form className="flex flex-col gap-5" noValidate onSubmit={onSubmit}>
        <FormAlert message={formError} />
        <TextField
          autoComplete="name"
          error={errors.fullName}
          label="Full name"
          onChange={set("fullName")}
          placeholder="Dr. Jane Doe"
          value={values.fullName}
        />
        <TextField
          autoComplete="email"
          error={errors.email}
          inputMode="email"
          label="Email"
          onChange={set("email")}
          placeholder="name@clinic.com"
          type="email"
          value={values.email}
        />
        <TextField
          autoComplete="tel"
          error={errors.phone}
          inputMode="tel"
          label="Phone number"
          onChange={set("phone")}
          placeholder="+1 555 123 4567"
          type="tel"
          value={values.phone}
        />
        <PasswordField
          autoComplete="new-password"
          error={errors.password}
          hint={
            values.password ? (
              <span className="flex items-center gap-3">
                <span className="flex flex-1 gap-1" aria-hidden="true">
                  {[0, 1, 2, 3].map((bar) => (
                    <span
                      className={cx(
                        "h-1 flex-1 rounded-full transition-colors",
                        bar < strength ? STRENGTH_COLORS[strength] : "bg-border-subtle",
                      )}
                      key={bar}
                    />
                  ))}
                </span>
                <span>{STRENGTH_LABELS[strength]}</span>
              </span>
            ) : (
              "At least 8 characters, with a letter and a number."
            )
          }
          label="Password"
          onChange={set("password")}
          value={values.password}
        />
        <PasswordField
          autoComplete="new-password"
          error={errors.confirmPassword}
          label="Confirm password"
          onChange={set("confirmPassword")}
          value={values.confirmPassword}
        />
        <SubmitButton loading={loading} loadingLabel="Creating account…">
          Create account
        </SubmitButton>
        <p className="text-center text-xs leading-5 text-brand-slate/60">
          We'll email you a 6-digit code to verify your address.
        </p>
      </form>
    </AuthLayout>
  )
}
