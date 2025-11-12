/**
 * Creates a UTC date at the start of the given date's day
 */
export function createUTCDateAtStartOfDay(date: Date): Date {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  )
}

