import { useEffect, useState } from "react"

export type AuthRoute = "login" | "signup" | "verify"

const AUTH_ROUTES: AuthRoute[] = ["login", "signup", "verify"]

function readRoute(): AuthRoute | null {
  // "#/login" → "login"; plain section anchors like "#pricing" aren't routes.
  const match = window.location.hash.match(/^#\/([\w-]+)/)
  const route = match?.[1] as AuthRoute | undefined
  return route && AUTH_ROUTES.includes(route) ? route : null
}

/** Tiny hash router for the auth screens: `#/login`, `#/signup`, `#/verify`. */
export function useHashRoute() {
  const [route, setRoute] = useState(readRoute)

  useEffect(() => {
    const onChange = () => {
      setRoute(readRoute())
      window.scrollTo({ top: 0, behavior: "instant" })
    }
    window.addEventListener("hashchange", onChange)
    return () => window.removeEventListener("hashchange", onChange)
  }, [])

  return route
}

export function navigate(route: AuthRoute | "home") {
  window.location.hash = route === "home" ? "" : `/${route}`
}
