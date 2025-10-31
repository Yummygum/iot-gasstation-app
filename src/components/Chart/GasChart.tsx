'use client'

import {
  BarChart2 as BarChartIcon,
  PieChart as PieChartIcon
} from 'lucide-react'
import { ComponentProps, useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Pie, PieChart, XAxis } from 'recharts'
import { twMerge } from 'tailwind-merge'

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

import { Button } from '../ui/button'
import IOTASymbol from '../ui/IOTASymbol'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle
} from '../ui/item'

// Static daily data (similar count to original), values adjusted slightly
const chartData = [
  { date: '2024-04-01', gas: 18 },
  { date: '2024-04-02', gas: 12 },
  { date: '2024-04-03', gas: 20 },
  { date: '2024-04-04', gas: 26 },
  { date: '2024-04-05', gas: 35 },
  { date: '2024-04-06', gas: 28 },
  { date: '2024-04-07', gas: 22 },
  { date: '2024-04-08', gas: 39 },
  { date: '2024-04-09', gas: 9 },
  { date: '2024-04-10', gas: 24 },
  { date: '2024-04-11', gas: 30 },
  { date: '2024-04-12', gas: 27 },
  { date: '2024-04-13', gas: 33 },
  { date: '2024-04-14', gas: 15 },
  { date: '2024-04-15', gas: 14 },
  { date: '2024-04-16', gas: 16 },
  { date: '2024-04-17', gas: 41 },
  { date: '2024-04-18', gas: 34 },
  { date: '2024-04-19', gas: 23 },
  { date: '2024-04-20', gas: 10 },
  { date: '2024-04-21', gas: 16 },
  { date: '2024-04-22', gas: 24 },
  { date: '2024-04-23', gas: 15 },
  { date: '2024-04-24', gas: 36 },
  { date: '2024-04-25', gas: 23 },
  { date: '2024-04-26', gas: 11 },
  { date: '2024-04-27', gas: 36 },
  { date: '2024-04-28', gas: 14 },
  { date: '2024-04-29', gas: 28 },
  { date: '2024-04-30', gas: 42 },
  { date: '2024-05-01', gas: 18 },
  { date: '2024-05-02', gas: 27 },
  { date: '2024-05-03', gas: 23 },
  { date: '2024-05-04', gas: 35 },
  { date: '2024-05-05', gas: 45 },
  { date: '2024-05-06', gas: 44 },
  { date: '2024-05-07', gas: 36 },
  { date: '2024-05-08', gas: 16 },
  { date: '2024-05-09', gas: 24 },
  { date: '2024-05-10', gas: 27 },
  { date: '2024-05-11', gas: 31 },
  { date: '2024-05-12', gas: 21 },
  { date: '2024-05-13', gas: 20 },
  { date: '2024-05-14', gas: 41 },
  { date: '2024-05-15', gas: 44 },
  { date: '2024-05-16', gas: 31 },
  { date: '2024-05-17', gas: 46 },
  { date: '2024-05-18', gas: 29 },
  { date: '2024-05-19', gas: 22 },
  { date: '2024-05-20', gas: 18 },
  { date: '2024-05-21', gas: 12 },
  { date: '2024-05-22', gas: 10 },
  { date: '2024-05-23', gas: 26 },
  { date: '2024-05-24', gas: 27 },
  { date: '2024-05-25', gas: 22 },
  { date: '2024-05-26', gas: 23 },
  { date: '2024-05-27', gas: 39 },
  { date: '2024-05-28', gas: 24 },
  { date: '2024-05-29', gas: 11 },
  { date: '2024-05-30', gas: 32 },
  { date: '2024-05-31', gas: 19 },
  { date: '2024-06-01', gas: 16 },
  { date: '2024-06-02', gas: 44 },
  { date: '2024-06-03', gas: 12 },
  { date: '2024-06-04', gas: 41 },
  { date: '2024-06-05', gas: 10 },
  { date: '2024-06-06', gas: 27 },
  { date: '2024-06-07', gas: 30 },
  { date: '2024-06-08', gas: 35 },
  { date: '2024-06-09', gas: 41 },
  { date: '2024-06-10', gas: 17 },
  { date: '2024-06-11', gas: 12 },
  { date: '2024-06-12', gas: 46 },
  { date: '2024-06-13', gas: 10 },
  { date: '2024-06-14', gas: 39 },
  { date: '2024-06-15', gas: 28 },
  { date: '2024-06-16', gas: 35 },
  { date: '2024-06-17', gas: 45 },
  { date: '2024-06-18', gas: 12 },
  { date: '2024-06-19', gas: 31 },
  { date: '2024-06-20', gas: 37 },
  { date: '2024-06-21', gas: 18 },
  { date: '2024-06-22', gas: 29 },
  { date: '2024-06-23', gas: 45 },
  { date: '2024-06-24', gas: 15 },
  { date: '2024-06-25', gas: 16 },
  { date: '2024-06-26', gas: 41 },
  { date: '2024-06-27', gas: 24 },
  { date: '2024-06-28', gas: 16 },
  { date: '2024-06-29', gas: 12 },
  { date: '2024-06-30', gas: 20 }
]

const chartConfig = {
  gas: {
    label: 'Gas spent',
    color: 'var(--color-primary)',
    icon: IOTASymbol
  }
} satisfies ChartConfig

const GasChart = ({ className, ...props }: ComponentProps<'div'>) => {
  const [timeRangeDays, setTimeRangeDays] = useState(30)
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar')

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date('2024-06-30')
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - timeRangeDays)
    return date >= startDate
  })

  const description = useMemo(() => {
    return `Showing gas spent for the last ${timeRangeDays} days`
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
            variant={chartType === 'pie' ? 'outlineActive' : 'outline'}
          >
            <PieChartIcon />
          </Button>

          <Button
            onClick={() => setChartType('bar')}
            size="icon"
            variant={chartType === 'bar' ? 'outlineActive' : 'outline'}
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
          {chartType === 'bar' ? (
            <BarChart
              accessibilityLayer
              data={filteredData}
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
                    nameKey="views"
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
                data={chartData}
                dataKey="visitors"
                innerRadius={60}
                nameKey="browser"
              />
            </PieChart>
          )}
        </ChartContainer>
      </ItemContent>
    </Item>
  )
}

export default GasChart
