/**
 * Increments a UTC date by one day
 */
export function incrementUTCDateByDay(date: Date): Date {
  const nextDate = new Date(date)
  nextDate.setUTCDate(nextDate.getUTCDate() + 1)
  return nextDate
}

