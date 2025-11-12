import { Separator } from '@radix-ui/react-separator'
import { Fragment } from 'react'

import { quickHash } from '@/lib/utils/quickHash'

import IOTAAmount from '../IOTAAmount'
import { ValueRenderer } from '../ValueRenderer'

const BudgetBarItem = ({
  title,
  value,
  isLast
}: {
  title: string
  value: number | Date
  isLast: boolean
}) => {
  const isBalance = title === 'Current balance'

  return (
    <Fragment key={quickHash(title)}>
      <div className="animate-in fade-in-20 flex flex-col items-start">
        <h2 className="text-muted-foreground text-xs uppercase">{title}</h2>
        <p className="text-foreground text-lg font-normal">
          {isBalance && typeof value === 'number' ? (
            <IOTAAmount amount={value} hasIOTAMark size="lg" />
          ) : (
            <ValueRenderer value={value} />
          )}
        </p>
      </div>

      {!isLast && (
        <Separator
          className="bg-border animate-in fade-in-20 w-px"
          orientation="vertical"
        />
      )}
    </Fragment>
  )
}

export default BudgetBarItem
