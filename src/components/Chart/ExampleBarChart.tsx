'use client'

import { XIcon } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer } from 'recharts'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'

import { Item, ItemContent } from '../ui/item'

const chartData = [
  { amount: 0.0015, quantity: 15 },
  { amount: 0.0016, quantity: 22 },
  { amount: 0.0017, quantity: 24 },
  { amount: 0.0018, quantity: 16 },
  { amount: 0.0019, quantity: 12 }
]

const chartConfig = {
  amount: {
    label: 'Amount',
    color: 'var(--chart-1)'
  },
  quantity: {
    color: 'var(--chart-2)',
    label: 'Quantity',
    icon: XIcon
  }
} satisfies ChartConfig

const ExampleBarChart = () => {
  return (
    <Item variant="outline">
      <ItemContent className="h-fit">
        <h2 className="text-muted-foreground mb-8">Median Daily Spend</h2>

        <ResponsiveContainer height={125} width="100%">
          <ChartContainer config={chartConfig}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <Bar
                dataKey="quantity"
                fill="var(--chart-1)"
                radius={[16, 16, 0, 0]}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(value, payload) => {
                      if (!payload?.length) {
                        return null
                      }

                      return `Amount: ${payload[0].payload.amount}`
                    }}
                  />
                }
                cursor={false}
              />
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </ItemContent>
    </Item>
  )
}

export default ExampleBarChart
