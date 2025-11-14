import { createUTCDateAtStartOfDay } from './createUTCDateAtStartOfDay'
import { formatDateToDay } from './dateUtils'
import { incrementUTCDateByDay } from './incrementUTCDateByDay'

/**
 * Fills in missing days in a date range with zero values
 * This ensures the bar chart shows one bar per day even if there are no transactions
 * Uses UTC dates to match the grouping logic
 */
export function fillMissingDays(
  dailyTotals: Map<string, number>,
  startDate: Date,
  endDate: Date
): Map<string, number> {
  const filled = new Map(dailyTotals)
  let currentDate = createUTCDateAtStartOfDay(startDate)
  const endDateUTC = createUTCDateAtStartOfDay(endDate)

  while (currentDate <= endDateUTC) {
    const dayKey = formatDateToDay(currentDate)
    if (!filled.has(dayKey)) {
      filled.set(dayKey, 0)
    }

    currentDate = incrementUTCDateByDay(currentDate)
  }

  return filled
}
