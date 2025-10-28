'use client'

import { useState } from 'react'
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

export const description = 'An interactive area chart'

const chartData = [
  { date: '2024-04-01', gas: 222 },
  { date: '2024-04-02', gas: 97 },
  { date: '2024-04-03', gas: 167 },
  { date: '2024-04-04', gas: 242 },
  { date: '2024-04-05', gas: 373 },
  { date: '2024-04-06', gas: 301 },
  { date: '2024-04-07', gas: 245 },
  { date: '2024-04-08', gas: 409 },
  { date: '2024-04-09', gas: 59 },
  { date: '2024-04-10', gas: 261 },
  { date: '2024-04-11', gas: 327 },
  { date: '2024-04-12', gas: 292 },
  { date: '2024-04-13', gas: 342 },
  { date: '2024-04-14', gas: 137 },
  { date: '2024-04-15', gas: 120 },
  { date: '2024-04-16', gas: 138 },
  { date: '2024-04-17', gas: 446 },
  { date: '2024-04-18', gas: 364 },
  { date: '2024-04-19', gas: 243 },
  { date: '2024-04-20', gas: 89 },
  { date: '2024-04-21', gas: 137 },
  { date: '2024-04-22', gas: 224 },
  { date: '2024-04-23', gas: 138 },
  { date: '2024-04-24', gas: 387 },
  { date: '2024-04-25', gas: 215 },
  { date: '2024-04-26', gas: 75 },
  { date: '2024-04-27', gas: 383 },
  { date: '2024-04-28', gas: 122 },
  { date: '2024-04-29', gas: 315 },
  { date: '2024-04-30', gas: 454 },
  { date: '2024-05-01', gas: 165 },
  { date: '2024-05-02', gas: 293 },
  { date: '2024-05-03', gas: 247 },
  { date: '2024-05-04', gas: 385 },
  { date: '2024-05-05', gas: 481 },
  { date: '2024-05-06', gas: 498 },
  { date: '2024-05-07', gas: 388 },
  { date: '2024-05-08', gas: 149 },
  { date: '2024-05-09', gas: 227 },
  { date: '2024-05-10', gas: 293 },
  { date: '2024-05-11', gas: 335 },
  { date: '2024-05-12', gas: 197 },
  { date: '2024-05-13', gas: 197 },
  { date: '2024-05-14', gas: 448 },
  { date: '2024-05-15', gas: 473 },
  { date: '2024-05-16', gas: 338 },
  { date: '2024-05-17', gas: 499 },
  { date: '2024-05-18', gas: 315 },
  { date: '2024-05-19', gas: 235 },
  { date: '2024-05-20', gas: 177 },
  { date: '2024-05-21', gas: 82 },
  { date: '2024-05-22', gas: 81 },
  { date: '2024-05-23', gas: 252 },
  { date: '2024-05-24', gas: 294 },
  { date: '2024-05-25', gas: 201 },
  { date: '2024-05-26', gas: 213 },
  { date: '2024-05-27', gas: 420 },
  { date: '2024-05-28', gas: 233 },
  { date: '2024-05-29', gas: 78 },
  { date: '2024-05-30', gas: 340 },
  { date: '2024-05-31', gas: 178 },
  { date: '2024-06-01', gas: 178 },
  { date: '2024-06-02', gas: 470 },
  { date: '2024-06-03', gas: 103 },
  { date: '2024-06-04', gas: 439 },
  { date: '2024-06-05', gas: 88 },
  { date: '2024-06-06', gas: 294 },
  { date: '2024-06-07', gas: 323 },
  { date: '2024-06-08', gas: 385 },
  { date: '2024-06-09', gas: 438 },
  { date: '2024-06-10', gas: 155 },
  { date: '2024-06-11', gas: 92 },
  { date: '2024-06-12', gas: 492 },
  { date: '2024-06-13', gas: 81 },
  { date: '2024-06-14', gas: 426 },
  { date: '2024-06-15', gas: 307 },
  { date: '2024-06-16', gas: 371 },
  { date: '2024-06-17', gas: 475 },
  { date: '2024-06-18', gas: 107 },
  { date: '2024-06-19', gas: 341 },
  { date: '2024-06-20', gas: 408 },
  { date: '2024-06-21', gas: 169 },
  { date: '2024-06-22', gas: 317 },
  { date: '2024-06-23', gas: 480 },
  { date: '2024-06-24', gas: 132 },
  { date: '2024-06-25', gas: 141 },
  { date: '2024-06-26', gas: 434 },
  { date: '2024-06-27', gas: 448 },
  { date: '2024-06-28', gas: 149 },
  { date: '2024-06-29', gas: 103 },
  { date: '2024-06-30', gas: 446 }
]

const chartConfig = {
  gas: {
    label: 'Gas spent',
    color: 'var(--chart-2)',
    icon: IOTASymbol
  }
} satisfies ChartConfig

const ExampleChart = () => {
  const [timeRange, setTimeRange] = useState('90d')

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date('2024-06-30')
    let daysToSubtract = 90
    if (timeRange === '30d') {
      daysToSubtract = 30
    } else if (timeRange === '7d') {
      daysToSubtract = 7
    }

    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Item className="pt-0" variant="outline">
      <ItemHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <ItemTitle>Total gas spent</ItemTitle>
          <ItemDescription>
            Showing gas spent for the last 3 months
          </ItemDescription>
        </div>
        <Select onValueChange={setTimeRange} value={timeRange}>
          <SelectTrigger
            aria-label="Select a value"
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem className="rounded-lg" value="90d">
              Last 3 months
            </SelectItem>
            <SelectItem className="rounded-lg" value="30d">
              Last 30 days
            </SelectItem>
            <SelectItem className="rounded-lg" value="7d">
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
