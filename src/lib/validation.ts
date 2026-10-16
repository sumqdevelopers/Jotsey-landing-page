const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateEmail(value: string) {
  if (!value.trim()) return "Enter your email address."
  if (!EMAIL_PATTERN.test(value.trim())) return "Enter a valid email address, like name@clinic.com."
  return null
}

export function validateRequired(value: string, label: string) {
  return value.trim() ? null : `Enter your ${label}.`
}

export function validatePhone(value: string) {
  if (!value.trim()) return "Enter your phone number."
  const digits = value.replace(/\D/g, "")
  if (digits.length < 7 || digits.length > 15) return "Enter a valid phone number, including the area code."
  return null
}

export function validateNewPassword(value: string) {
  if (!value) return "Create a password."
  if (value.length < 8) return "Use at least 8 characters."
  if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) return "Include at least one letter and one number."
  return null
}

/** 0–4 score for the strength meter: length, mixed case, digits, symbols. */
export function passwordStrength(value: string) {
  let score = 0
  if (value.length >= 8) score++
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++
  if (/\d/.test(value)) score++
  if (/[^A-Za-z0-9]/.test(value) || value.length >= 14) score++
  return score
}
