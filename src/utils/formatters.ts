/**
 * Extracts initials from a full name
 * @param name - Full name to extract initials from
 * @returns Uppercase initials (e.g., "John Doe" -> "JD")
 */
export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

/**
 * Extracts the first name from a full name
 * @param name - Full name to extract first name from
 * @returns First name (e.g., "John Doe" -> "John")
 */
export function getFirstName(name: string): string {
  return name.trim().split(/\s+/)[0] || '';
}
