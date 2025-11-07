import { cn } from '@/lib/utils'

import IOTASymbol from './ui/IOTASymbol'

interface IIOTAAmountProps {
  className?: string
  hasIOTAMark?: boolean
  amount?: number
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const IOTAAmount = ({
  className,
  amount,
  hasIOTAMark = true,
  size = 'sm'
}: IIOTAAmountProps) => {
  const sizeMap = {
    xs: {
      value: 13,
      class: 'text-xs gap-1'
    },
    sm: {
      value: 16,
      class: 'text-sm gap-1'
    },
    md: {
      value: 20,
      class: 'text-base gap-1.5'
    },
    lg: {
      value: 24,
      class: 'text-lg gap-2'
    },
    xl: {
      value: 28,
      class: 'text-4xl gap-2.5'
    }
  }

  return (
    <span
      className={cn(
        'middle text-foreground inline-flex flex-wrap items-baseline font-medium',
        sizeMap[size].class,
        className
      )}
    >
      {hasIOTAMark && (
        <IOTASymbol className="self-center" size={sizeMap[size].value} />
      )}
      {amount}
    </span>
  )
}

export default IOTAAmount
