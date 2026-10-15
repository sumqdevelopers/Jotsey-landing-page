/**
 * Resolves a file from /public against the site's base path, so images work
 * both at a domain root ("/") and under a sub-path such as GitHub Pages'
 * "/Jotsey-landing-page/".
 */
export function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`
}
