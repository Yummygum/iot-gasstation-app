import { ComponentType, SVGProps } from 'react'

import IOTASymbol from '@/components/ui/IOTASymbol'
import { Item, ItemContent } from '@/components/ui/item'

import IOTAAmount from '../IOTAAmount'

interface ISpendingData {
  title: string
  amount: number
  icon: ComponentType<SVGProps<SVGSVGElement>> | null
  subItems?: Omit<ISpendingData, 'subItems'>[]
}

const spendingData: ISpendingData[] = [
  {
    title: 'IOTA Used',
    amount: 402,
    icon: IOTASymbol,
    subItems: [
      {
        title: 'Amount of transactions',
        amount: 12712,
        icon: null
      }
    ]
  },
  {
    title: 'Average transaction size',
    amount: 0.0002,
    icon: IOTASymbol
  }
]

const SpendingSummary = () => {
  return (
    <Item variant="outline">
      <ItemContent className="h-fit">
        <h2 className="text-muted-foreground mb-2">Past week</h2>

        {spendingData.map((data) => (
          <div className="py-2" key={data.title}>
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <span>{data.title}</span>
              </div>
              <IOTAAmount amount={data.amount} hasIOTAMark size="sm" />
            </div>

            {data.subItems &&
              data.subItems.map((subItem) => (
                <div
                  className="text-muted-foreground flex items-center justify-between text-sm"
                  key={subItem.title}
                >
                  <div className="flex items-center gap-2">
                    <span>{subItem.title}</span>
                  </div>
                  <IOTAAmount amount={subItem.amount} hasIOTAMark size="sm" />
                </div>
              ))}
          </div>
        ))}
      </ItemContent>
    </Item>
  )
}

export default SpendingSummary
