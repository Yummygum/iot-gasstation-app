/**
 * Helper functions to convert transaction API data into chart-ready formats
 */

import { fillMissingDays } from './fillMissingDays'
import { formatDateToDay } from './formatDateToDay'

export interface Transaction {
  groupId: string
  clientId: string
  transactionFee: number
  timestamp: string
}

export interface BarChartDataPoint {
  date: string
  gas: number
}

export interface PieChartDataPoint {
  name: string
  value: number
}

export type ChartType = 'bar' | 'pie'

/**
 * Groups transactions by day and sums transaction fees
 * Uses UTC dates to ensure consistent grouping regardless of local timezone
 */
function groupTransactionsByDay(
  transactions: Transaction[]
): Map<string, number> {
  const dailyTotals = new Map<string, number>()

  for (const transaction of transactions) {
    // Parse timestamp and use UTC to avoid timezone shifts
    const transactionDate = new Date(transaction.timestamp)
    const dayKey = formatDateToDay(transactionDate)

    const currentTotal = dailyTotals.get(dayKey) || 0
    dailyTotals.set(dayKey, currentTotal + transaction.transactionFee)
  }

  return dailyTotals
}

/**
 * Groups transactions by group ID and sums transaction fees
 */
function groupTransactionsByGroup(
  transactions: Transaction[]
): Map<string, number> {
  const groupTotals = new Map<string, number>()

  for (const transaction of transactions) {
    const currentTotal = groupTotals.get(transaction.groupId) || 0
    groupTotals.set(
      transaction.groupId,
      currentTotal + transaction.transactionFee
    )
  }

  return groupTotals
}

/**
 * Converts transactions to bar chart format
 * Groups transactions by day and ensures all days in the range are included
 */
export function convertToBarChartData(
  transactions: Transaction[],
  startDate?: Date,
  endDate?: Date
): BarChartDataPoint[] {
  // Filter transactions to only include those within the date range
  let filteredTransactions = transactions
  if (startDate && endDate) {
    filteredTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.timestamp)
      return transactionDate >= startDate && transactionDate <= endDate
    })
  }

  const dailyTotals = groupTransactionsByDay(filteredTransactions)

  // If date range is provided, fill in missing days
  let filledTotals = dailyTotals
  if (startDate && endDate) {
    filledTotals = fillMissingDays(dailyTotals, startDate, endDate)
  }

  // Convert to array and sort by date
  const dataPoints: BarChartDataPoint[] = Array.from(filledTotals.entries())
    .map(([date, gas]) => ({
      date,
      gas
    }))
    .sort((itemA, itemB) => itemA.date.localeCompare(itemB.date))

  return dataPoints
}

/**
 * Converts transactions to pie chart format
 * Groups transactions by group ID
 */
export function convertToPieChartData(
  transactions: Transaction[]
): PieChartDataPoint[] {
  const groupTotals = groupTransactionsByGroup(transactions)

  // Convert to array and sort by value (descending)
  const dataPoints: PieChartDataPoint[] = Array.from(groupTotals.entries())
    .map(([groupId, value]) => ({
      // Shortened group ID for display
      name: `Group ${groupId.slice(0, 8)}...`,
      value
    }))
    .sort((itemA, itemB) => itemB.value - itemA.value)

  return dataPoints
}

/**
 * Main conversion function that routes to the appropriate converter based on chart type
 */
export function convertTransactionsToChartData(
  transactions: Transaction[],
  chartType: ChartType,
  startDate?: Date,
  endDate?: Date
): BarChartDataPoint[] | PieChartDataPoint[] {
  if (chartType === 'bar') {
    return convertToBarChartData(transactions, startDate, endDate)
  }

  return convertToPieChartData(transactions)
}
