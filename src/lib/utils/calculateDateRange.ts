/**
 * Calculates the date range for a given number of days from today
 * Returns UTC dates to ensure consistent date handling across timezones
 * @param days - Number of days to go back from today
 * @returns Object with startDate (start of day) and endDate (end of day) in UTC
 */
export function calculateDateRange(days: number): {
  startDate: Date
  endDate: Date
} {
  const now = new Date()
  const end = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      23,
      59,
      59,
      999
    )
  )
  const start = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() - days,
      0,
      0,
      0,
      0
    )
  )
  return { startDate: start, endDate: end }
}

