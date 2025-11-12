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

export interface ClientBreakdown {
  clientId: string
  name: string
  amount: number
}

export interface BarChartDataPoint {
  date: string
  gas: number
  clientBreakdown?: ClientBreakdown[]
}

export interface PieChartDataPoint {
  name: string
  value: number
}

export type ChartType = 'bar' | 'pie'

/**
 * Groups transactions by day and sums transaction fees
 * Also tracks client breakdown per day
 * Uses UTC dates to ensure consistent grouping regardless of local timezone
 */
function groupTransactionsByDay(
  transactions: Transaction[]
): {
  dailyTotals: Map<string, number>
  dailyClientBreakdown: Map<string, Map<string, number>>
} {
  const dailyTotals = new Map<string, number>()
  const dailyClientBreakdown = new Map<string, Map<string, number>>()

  for (const transaction of transactions) {
    // Parse timestamp and use UTC to avoid timezone shifts
    const transactionDate = new Date(transaction.timestamp)
    const dayKey = formatDateToDay(transactionDate)

    // Update daily total
    const currentTotal = dailyTotals.get(dayKey) || 0
    dailyTotals.set(dayKey, currentTotal + transaction.transactionFee)

    // Update client breakdown for this day
    if (!dailyClientBreakdown.has(dayKey)) {
      dailyClientBreakdown.set(dayKey, new Map<string, number>())
    }
    const dayClients = dailyClientBreakdown.get(dayKey)!
    const clientTotal = dayClients.get(transaction.clientId) || 0
    dayClients.set(transaction.clientId, clientTotal + transaction.transactionFee)
  }

  return { dailyTotals, dailyClientBreakdown }
}

/**
 * Groups transactions by client ID and sums transaction fees
 */
function groupTransactionsByClient(
  transactions: Transaction[]
): Map<string, number> {
  const clientTotals = new Map<string, number>()

  for (const transaction of transactions) {
    const currentTotal = clientTotals.get(transaction.clientId) || 0
    clientTotals.set(
      transaction.clientId,
      currentTotal + transaction.transactionFee
    )
  }

  return clientTotals
}

/**
 * Gets a display name for a client, using the name if available, otherwise falling back to shortened clientId
 */
function getClientDisplayName(
  clientId: string,
  clientNameMap?: Map<string, string>
): string {
  if (clientNameMap?.has(clientId)) {
    const name = clientNameMap.get(clientId)!
    return name || `Client ${clientId.slice(0, 8)}...`
  }
  return `Client ${clientId.slice(0, 8)}...`
}

/**
 * Converts transactions to bar chart format
 * Groups transactions by day and ensures all days in the range are included
 * Includes client breakdown for each day
 */
export function convertToBarChartData(
  transactions: Transaction[],
  startDate?: Date,
  endDate?: Date,
  clientNameMap?: Map<string, string>
): BarChartDataPoint[] {
  // Filter transactions to only include those within the date range
  let filteredTransactions = transactions
  if (startDate && endDate) {
    filteredTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.timestamp)
      return transactionDate >= startDate && transactionDate <= endDate
    })
  }

  const { dailyTotals, dailyClientBreakdown } =
    groupTransactionsByDay(filteredTransactions)

  // If date range is provided, fill in missing days
  let filledTotals = dailyTotals
  if (startDate && endDate) {
    filledTotals = fillMissingDays(dailyTotals, startDate, endDate)
  }

  // Convert to array and sort by date, including client breakdown
  const dataPoints: BarChartDataPoint[] = Array.from(filledTotals.entries())
    .map(([date, gas]) => {
      const clientBreakdown = dailyClientBreakdown.get(date)
      const breakdown: ClientBreakdown[] = clientBreakdown
        ? Array.from(clientBreakdown.entries())
            .map(([clientId, amount]) => ({
              clientId,
              name: getClientDisplayName(clientId, clientNameMap),
              amount
            }))
            .sort((a, b) => b.amount - a.amount)
        : []

      return {
        date,
        gas,
        clientBreakdown: breakdown.length > 0 ? breakdown : undefined
      }
    })
    .sort((itemA, itemB) => itemA.date.localeCompare(itemB.date))

  return dataPoints
}

/**
 * Converts transactions to pie chart format
 * Groups transactions by client ID
 */
export function convertToPieChartData(
  transactions: Transaction[],
  clientNameMap?: Map<string, string>
): PieChartDataPoint[] {
  const clientTotals = groupTransactionsByClient(transactions)

  // Convert to array and sort by value (descending)
  const dataPoints: PieChartDataPoint[] = Array.from(clientTotals.entries())
    .map(([clientId, value]) => ({
      name: getClientDisplayName(clientId, clientNameMap),
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
  endDate?: Date,
  clientNameMap?: Map<string, string>
): BarChartDataPoint[] | PieChartDataPoint[] {
  if (chartType === 'bar') {
    return convertToBarChartData(transactions, startDate, endDate, clientNameMap)
  }

  return convertToPieChartData(transactions, clientNameMap)
}
