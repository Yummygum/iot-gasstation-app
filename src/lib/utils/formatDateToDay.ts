/**
 * Formats a date to YYYY-MM-DD string using UTC to avoid timezone issues
 */
export function formatDateToDay(date: Date): string {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Formats a database date to YYYY-MM-DD string using UTC to avoid timezone issues
 */
export function formatDatabaseDateToDay(
  date: string | null | undefined
): string {
  if (!date) {
    return ''
  }

  return formatDateToDay(new Date(date))
}
