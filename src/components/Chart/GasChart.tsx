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
  PieChartDataPoint
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
import GET_TRANSACTIONS_LIST from '@/lib/api/queries/getTransactionsList'
import { calculateDateRange } from '@/lib/utils'
import {
  convertToBarChartData,
  convertToPieChartData
} from '@/lib/utils/convertTransactionsToChartData'

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

const GasChart = ({ className, groupId, ...props }: GasChartProps) => {
  const [timeRangeDays, setTimeRangeDays] = useState(30)
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar')

  // Calculate date range for the query
  const { startDate, endDate } = useMemo(
    () => calculateDateRange(timeRangeDays),
    [timeRangeDays]
  )

  // Chart type flags
  const isPieChart = chartType === 'pie'
  const isBarChart = chartType === 'bar'

  // Fetch data from API
  const { data: queryData, loading } = useQuery(GET_TRANSACTIONS_LIST, {
    variables: {
      after: startDate.toISOString(),
      before: endDate.toISOString()
    }
  })

  // Get transactions from API and filter by groupId if provided
  const transactions = useMemo(() => {
    const allTransactions = queryData?.getTransactionList || []

    // If groupId is provided, filter transactions to only include those with matching groupId
    if (groupId) {
      return allTransactions.filter(
        (transaction) => transaction.groupId === groupId
      )
    }

    return allTransactions
  }, [queryData, groupId])

  // Convert transactions to chart data format
  const chartData = useMemo(() => {
    if (isBarChart) {
      return convertToBarChartData(transactions, startDate, endDate)
    }

    return convertToPieChartData(transactions)
  }, [transactions, isBarChart, startDate, endDate])

  const description = useMemo(() => {
    const timeframeLabels: Record<number, string> = {
      7: 'Last 7 days',
      30: 'Last 30 days',
      90: 'Last 3 months'
    }
    return `Showing gas spent for ${timeframeLabels[timeRangeDays] || `the last ${timeRangeDays} days`}`
  }, [timeRangeDays])

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
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px] border border-[#171D26]/15 bg-[#F1F7FE]/70 backdrop-blur-xs"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })
                    }}
                    nameKey="gas"
                  />
                }
              />
              <Bar
                dataKey="gas"
                fill="var(--color-gas)"
                radius={[999, 999, 0, 0]}
              />
            </BarChart>
          ) : (
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent hideLabel />}
                cursor={false}
              />
              <Pie
                data={chartData as PieChartDataPoint[]}
                dataKey="value"
                innerRadius={60}
                label={({ name, value }) => `${name}: ${value}`}
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
