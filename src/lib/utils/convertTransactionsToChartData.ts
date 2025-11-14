/**
 * Helper functions to convert transaction API data into chart-ready formats
 */

import { formatDateToDay } from './dateUtils'
import { fillMissingDays } from './fillMissingDays'

export interface Transaction {
  groupId: string
  clientId: string
  clientName?: string
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
 * Also tracks client breakdown per day with client names
 * Uses UTC dates to ensure consistent grouping regardless of local timezone
 */
// eslint-disable-next-line max-statements
function groupTransactionsByDay(transactions: Transaction[]): {
  dailyTotals: Map<string, number>
  dailyClientBreakdown: Map<string, Map<string, number>>
  clientNameMap: Map<string, string>
} {
  const dailyTotals = new Map<string, number>()
  const dailyClientBreakdown = new Map<string, Map<string, number>>()
  const clientNameMap = new Map<string, string>()

  for (const transaction of transactions) {
    // Parse timestamp and use UTC to avoid timezone shifts
    const transactionDate = new Date(transaction.timestamp)
    const dayKey = formatDateToDay(transactionDate)

    // Update daily total
    const currentTotal = dailyTotals.get(dayKey) || 0
    dailyTotals.set(dayKey, currentTotal + transaction.transactionFee)

    // Store client name if available
    if (transaction.clientName) {
      clientNameMap.set(transaction.clientId, transaction.clientName)
    }

    // Update client breakdown for this day
    if (!dailyClientBreakdown.has(dayKey)) {
      dailyClientBreakdown.set(dayKey, new Map<string, number>())
    }

    const dayClients = dailyClientBreakdown.get(dayKey)!

    const clientTotal = dayClients.get(transaction.clientId) || 0
    dayClients.set(
      transaction.clientId,
      clientTotal + transaction.transactionFee
    )
  }

  return { dailyTotals, dailyClientBreakdown, clientNameMap }
}

/**
 * Groups transactions by client ID and sums transaction fees
 * Also builds a map of clientId -> clientName
 */
function groupTransactionsByClient(transactions: Transaction[]): {
  clientTotals: Map<string, number>
  clientNameMap: Map<string, string>
} {
  const clientTotals = new Map<string, number>()
  const clientNameMap = new Map<string, string>()

  for (const transaction of transactions) {
    const currentTotal = clientTotals.get(transaction.clientId) || 0
    clientTotals.set(
      transaction.clientId,
      currentTotal + transaction.transactionFee
    )

    // Store client name if available
    if (transaction.clientName) {
      clientNameMap.set(transaction.clientId, transaction.clientName)
    }
  }

  return { clientTotals, clientNameMap }
}

/**
 * Gets a display name for a client, using the name from the map if available, otherwise falling back to shortened clientId
 */
function getClientDisplayName(
  clientId: string,
  clientNameMap: Map<string, string>
): string {
  const name = clientNameMap.get(clientId)
  return name || `Client ${clientId.slice(0, 8)}...`
}

/**
 * Converts transactions to bar chart format
 * Groups transactions by day and ensures all days in the range are included
 * Includes client breakdown for each day
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

  const { dailyTotals, dailyClientBreakdown, clientNameMap } =
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
            .sort((itemA, itemB) => itemB.amount - itemA.amount)
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
  transactions: Transaction[]
): PieChartDataPoint[] {
  const { clientTotals, clientNameMap } =
    groupTransactionsByClient(transactions)

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
  endDate?: Date
): BarChartDataPoint[] | PieChartDataPoint[] {
  if (chartType === 'bar') {
    return convertToBarChartData(transactions, startDate, endDate)
  }

  return convertToPieChartData(transactions)
}
