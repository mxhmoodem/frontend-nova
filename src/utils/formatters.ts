/**
 * Extracts the first name from a full name string
 */
export function getFirstName(name: string | undefined | null): string {
  if (!name) return '';
  return name.split(' ')[0];
}
