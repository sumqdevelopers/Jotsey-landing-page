import { useState, type FormEvent } from "react"
import FormAlert from "@/components/forms/FormAlert"
import PasswordField from "@/components/forms/PasswordField"
import SubmitButton from "@/components/forms/SubmitButton"
import TextField from "@/components/forms/TextField"
import { AuthError, login } from "@/lib/authApi"
import { validateEmail, validateRequired } from "@/lib/validation"
import AuthLayout from "@/sections/auth/AuthLayout"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ email?: string | null; password?: string | null }>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [signedIn, setSignedIn] = useState(false)

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const next = { email: validateEmail(email), password: validateRequired(password, "password") }
    setErrors(next)
    setFormError(null)
    if (next.email || next.password) return

    setLoading(true)
    try {
      await login(email.trim(), password)
      setSignedIn(true)
    } catch (error) {
      setFormError(error instanceof AuthError ? error.message : "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (signedIn) {
    return (
      <AuthLayout panel="login" title="You're signed in" subtitle={`Welcome back, ${email.trim()}.`}>
        <a className="block rounded-xl bg-accent-teal px-5 py-3.5 text-center text-[15px] font-semibold text-brand-navy" href="#">
          Continue to Jotsey
        </a>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      panel="login"
      title="Welcome back"
      subtitle={
        <>
          New to Jotsey?{" "}
          <a className="font-semibold text-accent-teal hover:underline" href="#/signup">
            Create an account
          </a>
        </>
      }
    >
      <form className="flex flex-col gap-5" noValidate onSubmit={onSubmit}>
        <FormAlert message={formError} />
        <TextField
          autoComplete="email"
          error={errors.email}
          inputMode="email"
          label="Email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@clinic.com"
          type="email"
          value={email}
        />
        <div>
          <PasswordField
            autoComplete="current-password"
            error={errors.password}
            label="Password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
          <div className="mt-2 text-right">
            <a className="text-[13px] font-medium text-accent-teal hover:underline" href="#/login">
              Forgot password?
            </a>
          </div>
        </div>
        <SubmitButton loading={loading} loadingLabel="Signing in…">
          Log in
        </SubmitButton>
      </form>
    </AuthLayout>
  )
}
