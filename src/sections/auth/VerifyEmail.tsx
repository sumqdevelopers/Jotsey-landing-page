import { useEffect, useState, type FormEvent } from "react"
import CodeInput from "@/components/forms/CodeInput"
import FormAlert from "@/components/forms/FormAlert"
import SubmitButton from "@/components/forms/SubmitButton"
import { AuthError, getPendingEmail, sendVerificationCode, verifyEmailCode } from "@/lib/authApi"
import AuthLayout from "@/sections/auth/AuthLayout"

const CODE_LENGTH = 6
const RESEND_COOLDOWN_S = 30

export default function VerifyEmail() {
  const [email] = useState(getPendingEmail)
  const [code, setCode] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [verified, setVerified] = useState(false)
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_S)
  const [resent, setResent] = useState(false)

  useEffect(() => {
    if (cooldown <= 0) return
    const timer = window.setTimeout(() => setCooldown((seconds) => seconds - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [cooldown])

  if (!email) {
    return (
      <AuthLayout panel="signup" title="Verify your email" subtitle="We couldn't find a sign-up in progress on this device.">
        <a className="block rounded-xl bg-accent-teal px-5 py-3.5 text-center text-[15px] font-semibold text-brand-navy" href="#/signup">
          Start sign-up
        </a>
      </AuthLayout>
    )
  }

  if (verified) {
    return (
      <AuthLayout panel="verified" title="Email verified" subtitle={`${email} is confirmed. Your account is ready.`}>
        <div className="mb-6 grid size-14 place-items-center rounded-full bg-accent-teal/15 text-accent-teal ring-1 ring-accent-teal/30" aria-hidden="true">
          <svg className="size-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12.5 4.5 4.5L19 7.5" />
          </svg>
        </div>
        <a className="block rounded-xl bg-accent-teal px-5 py-3.5 text-center text-[15px] font-semibold text-brand-navy" href="#/login">
          Continue to log in
        </a>
      </AuthLayout>
    )
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (code.length < CODE_LENGTH) {
      setError(`Enter all ${CODE_LENGTH} digits of the code.`)
      return
    }
    setError(null)
    setLoading(true)
    try {
      await verifyEmailCode(email, code)
      setVerified(true)
    } catch (caught) {
      setError(caught instanceof AuthError ? caught.message : "Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  const onResend = async () => {
    setCooldown(RESEND_COOLDOWN_S)
    setResent(false)
    setError(null)
    setCode("")
    await sendVerificationCode(email)
    setResent(true)
  }

  return (
    <AuthLayout
      panel="verify"
      title="Check your email"
      subtitle={
        <>
          We sent a {CODE_LENGTH}-digit code to <span className="font-semibold text-ink">{email}</span>. Enter it below
          to verify your account.
        </>
      }
    >
      <form className="flex flex-col gap-6" noValidate onSubmit={onSubmit}>
        <FormAlert message={error} />
        <CodeInput
          describedBy="code-help"
          invalid={Boolean(error)}
          length={CODE_LENGTH}
          onChange={(next) => {
            setCode(next)
            if (error) setError(null)
          }}
          value={code}
        />
        <SubmitButton loading={loading} loadingLabel="Verifying…">
          Verify email
        </SubmitButton>
        <div className="text-center text-sm text-brand-slate/70" id="code-help" aria-live="polite">
          {resent && <p className="mb-1 text-accent-teal">A new code is on its way.</p>}
          Didn't get it? Check your spam folder or{" "}
          {cooldown > 0 ? (
            <span>resend in {cooldown}s</span>
          ) : (
            <button className="font-semibold text-accent-teal hover:underline" type="button" onClick={onResend}>
              resend the code
            </button>
          )}
          .
        </div>
        <a className="text-center text-[13px] font-medium text-brand-slate/60 hover:text-ink" href="#/signup">
          Wrong email? Go back
        </a>
      </form>
    </AuthLayout>
  )
}
