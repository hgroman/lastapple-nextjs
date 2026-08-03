import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a post date deterministically.
 *
 * `publishedAt` in frontmatter is a date-ONLY string ("2026-08-02"). JS parses that
 * as UTC midnight, so formatting it in the viewer's local timezone renders the
 * PREVIOUS day for anyone west of UTC — "August 2" on the server, "August 1" in
 * California. That is two bugs at once: a wrong published date for most US readers,
 * and a server/client text mismatch that throws React hydration error #418 on every
 * page (observed live 2026-08-02).
 *
 * These dates mean a calendar day, not an instant, so they must be formatted in UTC.
 * Pinning the timeZone makes the output identical on server and client by construction.
 */
export function formatPostDate(
  dateString: string,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
): string {
  return new Date(dateString).toLocaleDateString('en-US', { ...options, timeZone: 'UTC' })
}
