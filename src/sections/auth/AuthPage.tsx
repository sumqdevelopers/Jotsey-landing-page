import type { AuthRoute } from "@/hooks/useHashRoute"
import LoginForm from "@/sections/auth/LoginForm"
import SignupForm from "@/sections/auth/SignupForm"
import VerifyEmail from "@/sections/auth/VerifyEmail"

interface AuthPageProps {
  route: AuthRoute
}

export default function AuthPage({ route }: AuthPageProps) {
  if (route === "signup") return <SignupForm />
  if (route === "verify") return <VerifyEmail />
  return <LoginForm />
}
