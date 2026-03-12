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

/**
 * Formats a file size in bytes to a human-readable string
 * @param bytes - File size in bytes
 * @returns Formatted file size (e.g., "1.5 MB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${units[i]}`;
}

/**
 * Formats a date to a readable string
 * @param date - Date to format
 * @returns Formatted date string (e.g., "Feb 25, 2026")
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}
