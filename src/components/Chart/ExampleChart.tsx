'use client'

import { useMemo, useState } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
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

import IOTASymbol from '../ui/IOTASymbol'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle
} from '../ui/item'

const chartData = [
  { date: '2024-04-01', gas: 22 },
  { date: '2024-04-02', gas: 9 },
  { date: '2024-04-03', gas: 16 },
  { date: '2024-04-04', gas: 24 },
  { date: '2024-04-05', gas: 37 },
  { date: '2024-04-06', gas: 30 },
  { date: '2024-04-07', gas: 24 },
  { date: '2024-04-08', gas: 40 },
  { date: '2024-04-09', gas: 5 },
  { date: '2024-04-10', gas: 26 },
  { date: '2024-04-11', gas: 32 },
  { date: '2024-04-12', gas: 29 },
  { date: '2024-04-13', gas: 34 },
  { date: '2024-04-14', gas: 13 },
  { date: '2024-04-15', gas: 12 },
  { date: '2024-04-16', gas: 13 },
  { date: '2024-04-17', gas: 44 },
  { date: '2024-04-18', gas: 36 },
  { date: '2024-04-19', gas: 24 },
  { date: '2024-04-20', gas: 8 },
  { date: '2024-04-21', gas: 13 },
  { date: '2024-04-22', gas: 22 },
  { date: '2024-04-23', gas: 13 },
  { date: '2024-04-24', gas: 38 },
  { date: '2024-04-25', gas: 21 },
  { date: '2024-04-26', gas: 7 },
  { date: '2024-04-27', gas: 38 },
  { date: '2024-04-28', gas: 12 },
  { date: '2024-04-29', gas: 31 },
  { date: '2024-04-30', gas: 45 },
  { date: '2024-05-01', gas: 16 },
  { date: '2024-05-02', gas: 29 },
  { date: '2024-05-03', gas: 24 },
  { date: '2024-05-04', gas: 38 },
  { date: '2024-05-05', gas: 48 },
  { date: '2024-05-06', gas: 49 },
  { date: '2024-05-07', gas: 38 },
  { date: '2024-05-08', gas: 14 },
  { date: '2024-05-09', gas: 22 },
  { date: '2024-05-10', gas: 29 },
  { date: '2024-05-11', gas: 33 },
  { date: '2024-05-12', gas: 19 },
  { date: '2024-05-13', gas: 19 },
  { date: '2024-05-14', gas: 44 },
  { date: '2024-05-15', gas: 47 },
  { date: '2024-05-16', gas: 33 },
  { date: '2024-05-17', gas: 49 },
  { date: '2024-05-18', gas: 31 },
  { date: '2024-05-19', gas: 23 },
  { date: '2024-05-20', gas: 17 },
  { date: '2024-05-21', gas: 8 },
  { date: '2024-05-22', gas: 8 },
  { date: '2024-05-23', gas: 25 },
  { date: '2024-05-24', gas: 29 },
  { date: '2024-05-25', gas: 20 },
  { date: '2024-05-26', gas: 21 },
  { date: '2024-05-27', gas: 42 },
  { date: '2024-05-28', gas: 23 },
  { date: '2024-05-29', gas: 7 },
  { date: '2024-05-30', gas: 34 },
  { date: '2024-05-31', gas: 17 },
  { date: '2024-06-01', gas: 17 },
  { date: '2024-06-02', gas: 47 },
  { date: '2024-06-03', gas: 10 },
  { date: '2024-06-04', gas: 43 },
  { date: '2024-06-05', gas: 8 },
  { date: '2024-06-06', gas: 29 },
  { date: '2024-06-07', gas: 32 },
  { date: '2024-06-08', gas: 38 },
  { date: '2024-06-09', gas: 43 },
  { date: '2024-06-10', gas: 15 },
  { date: '2024-06-11', gas: 9 },
  { date: '2024-06-12', gas: 49 },
  { date: '2024-06-13', gas: 8 },
  { date: '2024-06-14', gas: 42 },
  { date: '2024-06-15', gas: 30 },
  { date: '2024-06-16', gas: 37 },
  { date: '2024-06-17', gas: 47 },
  { date: '2024-06-18', gas: 10 },
  { date: '2024-06-19', gas: 34 },
  { date: '2024-06-20', gas: 40 },
  { date: '2024-06-21', gas: 16 },
  { date: '2024-06-22', gas: 31 },
  { date: '2024-06-23', gas: 48 },
  { date: '2024-06-24', gas: 13 },
  { date: '2024-06-25', gas: 14 },
  { date: '2024-06-26', gas: 43 },
  { date: '2024-06-27', gas: 26 },
  { date: '2024-06-28', gas: 14 },
  { date: '2024-06-29', gas: 10 },
  { date: '2024-06-30', gas: 18 }
]

const chartConfig = {
  gas: {
    label: 'Gas spent',
    color: 'var(--chart-1)',
    icon: IOTASymbol
  }
} satisfies ChartConfig

const ExampleChart = () => {
  const [timeRangeDays, setTimeRangeDays] = useState(7)

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date('2024-06-30')
    const daysToSubtract = timeRangeDays

    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  const description = useMemo(() => {
    return `Showing gas spent for the last ${timeRangeDays} days`
  }, [timeRangeDays])

  return (
    <Item className="pt-0" variant="outline">
      <ItemHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <ItemTitle>Total gas spent</ItemTitle>
          <ItemDescription>{description}</ItemDescription>
        </div>
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
      </ItemHeader>
      <ItemContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          className="aspect-auto h-[250px] w-full"
          config={chartConfig}
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillgas" x1="0" x2="0" y1="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-gas)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-gas)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
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
                  indicator="dot"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })
                  }}
                />
              }
              cursor={false}
            />
            <Area
              dataKey="gas"
              fill="url(#fillgas)"
              stackId="a"
              stroke="var(--color-gas)"
              type="natural"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </ItemContent>
    </Item>
  )
}

export default ExampleChart
