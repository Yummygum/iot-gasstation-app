'use client'

import { useQuery } from '@apollo/client/react'
import {
  BarChart2 as BarChartIcon,
  PieChart as PieChartIcon
} from 'lucide-react'
import { ComponentProps, useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Pie, PieChart, XAxis } from 'recharts'
import { twMerge } from 'tailwind-merge'

import type {
  BarChartDataPoint,
  PieChartDataPoint,
  Transaction
} from '@/lib/utils/convertTransactionsToChartData'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import GET_CLIENT_LIST from '@/lib/api/queries/getClientList'
import GET_TRANSACTIONS_LIST from '@/lib/api/queries/getTransactionsList'
import { calculateDateRange } from '@/lib/utils'
import {
  convertToBarChartData,
  convertToPieChartData
} from '@/lib/utils/convertTransactionsToChartData'

import IOTAAmount from '../IOTAAmount'
import { Button } from '../ui/button'
import IOTASymbol from '../ui/IOTASymbol'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle
} from '../ui/item'

const chartConfig = {
  gas: {
    label: 'Gas spent',
    color: 'var(--color-primary)',
    icon: IOTASymbol
  }
} satisfies ChartConfig

interface GasChartProps extends ComponentProps<'div'> {
  groupId?: string
}

/**
 * Creates a map of clientId -> name from client list data
 */
function createClientNameMap(clientData?: {
  getClientList?: Array<{ clientId?: string; name?: string }>
}): Map<string, string> {
  const map = new Map<string, string>()

  if (clientData?.getClientList) {
    for (const client of clientData.getClientList) {
      if (client.clientId && client.name) {
        map.set(client.clientId, client.name)
      }
    }
  }

  return map
}

/**
 * Gets the description text for the chart based on time range
 */
function getChartDescription(timeRangeDays: number): string {
  const timeframeLabels: Record<number, string> = {
    7: 'Last 7 days',
    30: 'Last 30 days',
    90: 'Last 3 months'
  }

  return `Showing gas spent for ${timeframeLabels[timeRangeDays] || `the last ${timeRangeDays} days`}`
}

/**
 * Filters transactions by groupId if provided
 */
function filterTransactionsByGroup(
  transactions: Transaction[],
  groupId?: string
): Transaction[] {
  if (!groupId) {
    return transactions
  }

  return transactions.filter((transaction) => transaction.groupId === groupId)
}

/**
 * Checks if chart data is empty or contains only zero values
 */
function hasNoChartData(
  chartData: BarChartDataPoint[] | PieChartDataPoint[],
  isBarChart: boolean
): boolean {
  if (!chartData || chartData.length === 0) {
    return true
  }

  if (isBarChart) {
    const barData = chartData as BarChartDataPoint[]
    return barData.every((point) => point.gas === 0)
  }

  const pieData = chartData as PieChartDataPoint[]
  return pieData.every((point) => point.value === 0)
}

/**
 * Custom tooltip for bar chart showing client breakdown
 */
/**
 * Formats a date string for display in the tooltip
 */
function formatTooltipDate(label?: string): string {
  if (!label) {
    return ''
  }

  return new Date(label).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

/**
 * Custom tooltip for bar chart showing client breakdown
 */
interface BarChartTooltipProps {
  // eslint-disable-next-line react/boolean-prop-naming
  active?: boolean
  label?: string
  payload?: Array<{
    payload?: BarChartDataPoint
    value?: number
  }>
}

const BarChartTooltip = ({
  active: isActive,
  label,
  payload
}: BarChartTooltipProps) => {
  if (!isActive || !payload?.length) {
    return null
  }

  const data = payload[0]?.payload as BarChartDataPoint | undefined
  const clientBreakdown = data?.clientBreakdown || []
  const formattedDate = formatTooltipDate(label)
  const totalValue = payload[0]?.value || 0

  return (
    <div className="glass min-w-[180px] rounded-lg border px-3 py-2">
      <div className="mb-2 text-sm font-medium">{formattedDate}</div>
      <div className="space-y-1 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Total:</span>
          <IOTAAmount amount={totalValue} size="xs" />
        </div>
        {clientBreakdown.length > 0 && (
          <div className="mt-2 border-t border-[#171D26]/10 pt-2">
            <div className="text-muted-foreground mb-1 text-[10px] font-medium uppercase">
              By Client:
            </div>
            {clientBreakdown.map((client) => (
              <div
                className="flex items-center justify-between"
                key={client.clientId}
              >
                <span className="text-muted-foreground max-w-[100px] truncate">
                  {client.name}
                </span>
                <IOTAAmount amount={client.amount} className="ml-2" size="xs" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const GasChart = ({ className, groupId, ...props }: GasChartProps) => {
  const [timeRangeDays, setTimeRangeDays] = useState(30)
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar')

  // Calculate date range for the query
  const { startDate, endDate } = useMemo(
    () => calculateDateRange(timeRangeDays),
    [timeRangeDays]
  )

  // Chart type flags
  const { isPieChart, isBarChart } = useMemo(
    () => ({
      isPieChart: chartType === 'pie',
      isBarChart: chartType === 'bar'
    }),
    [chartType]
  )

  // Fetch data from API
  const { data: queryData, loading } = useQuery(GET_TRANSACTIONS_LIST, {
    variables: {
      after: startDate.toISOString(),
      before: endDate.toISOString()
    }
  })

  // Fetch client list to get client names
  const { data: clientData } = useQuery(GET_CLIENT_LIST)

  // Get transactions from API and filter by groupId if provided
  const transactions = useMemo(() => {
    const allTransactions = queryData?.getTransactionList || []

    return filterTransactionsByGroup(allTransactions, groupId)
  }, [queryData, groupId])

  // Convert transactions to chart data format and check if empty
  const { chartData, hasNoData, description } = useMemo(() => {
    const clientNameMap = createClientNameMap(clientData)
    const data = isBarChart
      ? convertToBarChartData(transactions, startDate, endDate, clientNameMap)
      : convertToPieChartData(transactions, clientNameMap)

    return {
      chartData: data,
      hasNoData: hasNoChartData(data, isBarChart),
      description: getChartDescription(timeRangeDays)
    }
  }, [transactions, isBarChart, startDate, endDate, clientData, timeRangeDays])

  return (
    <Item className={twMerge('pt-0', className)} variant="outline" {...props}>
      <ItemHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <ItemTitle>Total gas spent</ItemTitle>
          <ItemDescription>{description}</ItemDescription>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setChartType('pie')}
            size="icon"
            variant={isPieChart ? 'outlineActive' : 'outline'}
          >
            <PieChartIcon />
          </Button>

          <Button
            onClick={() => setChartType('bar')}
            size="icon"
            variant={isBarChart ? 'outlineActive' : 'outline'}
          >
            <BarChartIcon />
          </Button>
          <Select
            onValueChange={(selectedValue) =>
              setTimeRangeDays(parseInt(selectedValue, 10))
            }
            value={String(timeRangeDays)}
          >
            <SelectTrigger
              aria-label="Select a value"
              className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            >
              <SelectValue placeholder="Last 90 days" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem className="rounded-lg" value="90">
                Last 3 months
              </SelectItem>
              <SelectItem className="rounded-lg" value="30">
                Last 30 days
              </SelectItem>
              <SelectItem className="rounded-lg" value="7">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </ItemHeader>
      <ItemContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          className="aspect-auto h-[250px] w-full"
          config={chartConfig}
        >
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">Loading chart data...</p>
            </div>
          ) : hasNoData ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground text-sm">
                No transactions found for the selected period
              </p>
            </div>
          ) : isBarChart ? (
            <BarChart
              accessibilityLayer
              data={chartData as BarChartDataPoint[]}
              margin={{
                left: 12,
                right: 12
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                axisLine={false}
                dataKey="date"
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })
                }}
                tickLine={false}
                tickMargin={8}
              />
              <ChartTooltip content={<BarChartTooltip />} />
              <Bar
                dataKey="gas"
                fill="var(--color-gas)"
                radius={[999, 999, 0, 0]}
              />
            </BarChart>
          ) : (
            <PieChart>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => (
                      <IOTAAmount amount={value as number} size="xs" />
                    )}
                    hideLabel
                  />
                }
                cursor={false}
              />
              <Pie
                data={chartData as PieChartDataPoint[]}
                dataKey="value"
                innerRadius={60}
                label={({ name, value }) => (
                  <>
                    {name}:
                    <IOTAAmount amount={value as number} size="xs" />
                  </>
                )}
                nameKey="name"
              />
            </PieChart>
          )}
        </ChartContainer>
      </ItemContent>
    </Item>
  )
}

export default GasChart
