/**
 * Placeholder auth client. There is no backend yet: every call resolves after a short
 * delay so the UI's loading, error and success states can be exercised.
 * Replace each function body with a real request (keep the signatures) when the API exists.
 */

export interface SignupInput {
  fullName: string
  email: string
  phone: string
  password: string
}

export class AuthError extends Error {}

const PENDING_EMAIL_KEY = "jotsey:pending-verification-email"
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function login(email: string, password: string) {
  await delay(900)
  // Demo rule so the error state is reachable: any password works except "wrongpass".
  if (password === "wrongpass") throw new AuthError("That email and password don't match.")
  return { email }
}

export async function signup(input: SignupInput) {
  await delay(1100)
  rememberPendingEmail(input.email)
  await sendVerificationCode(input.email)
  return { email: input.email }
}

export async function sendVerificationCode(email: string) {
  await delay(600)
  return { email }
}

export async function verifyEmailCode(email: string, code: string) {
  await delay(900)
  // Demo rule: "000000" is rejected, any other 6-digit code succeeds.
  if (code === "000000") throw new AuthError("That code is incorrect or has expired.")
  forgetPendingEmail()
  return { email, verified: true }
}

export function rememberPendingEmail(email: string) {
  try {
    sessionStorage.setItem(PENDING_EMAIL_KEY, email)
  } catch {
    // storage unavailable; the verify screen falls back to asking the user to sign up again
  }
}

export function getPendingEmail() {
  try {
    return sessionStorage.getItem(PENDING_EMAIL_KEY)
  } catch {
    return null
  }
}

function forgetPendingEmail() {
  try {
    sessionStorage.removeItem(PENDING_EMAIL_KEY)
  } catch {
    // nothing to clean up
  }
}
