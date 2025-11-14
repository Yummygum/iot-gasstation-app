'use client'

import { useMemo } from 'react'

import { useExchangeRate } from '@/contexts/ExchangeRateContext'
import { useSettings } from '@/contexts/SettingsContext'
import { cn, formatCurrency } from '@/lib/utils'

import IOTASymbol from './ui/IOTASymbol'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

interface IIOTAAmountProps {
  className?: string
  hasIOTAMark?: boolean
  amount?: number
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

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

/**
 * Renders the tooltip content showing conversion and rate
 */
function renderTooltipContent(
  exchanged: string | null,
  currencySymbol: string,
  conversionRate: string | null
) {
  return (
    <div className="flex flex-col items-center gap-2">
      {exchanged && (
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium">
            {currencySymbol}
            {exchanged}
          </span>
        </div>
      )}
      {conversionRate && (
        <div className="text-muted-foreground flex w-full items-center justify-center gap-1.5 border-t border-[#171D26]/10 pt-2 text-center text-xs">
          <IOTASymbol size={12} />
          <span className="font-medium">{currencySymbol}1</span>
          <span className="">=</span>
          <span className="font-medium">{conversionRate.toLocaleString()}</span>
        </div>
      )}
    </div>
  )
}

const IOTAAmount = ({
  className,
  amount,
  hasIOTAMark = true,
  size = 'sm'
}: IIOTAAmountProps) => {
  const { currency } = useSettings()
  const { exchangeRate } = useExchangeRate()

  const { exchanged, currencySymbol, conversionRate } = useMemo(() => {
    const symbol = currency === 'EUR' ? '€' : '$'
    let exchangedValue: string | null = null

    if (
      amount !== null &&
      amount !== undefined &&
      exchangeRate &&
      amount !== 0
    ) {
      // exchangeRate is how many IOTA per 1 unit of the selected currency
      // To convert IOTA to currency: Currency = IOTA / exchangeRate
      exchangedValue = formatCurrency(amount / exchangeRate, currency)
    }

    // Format exchangeRate as IOTA amount (e.g., "8.36400" IOTA per 1 EUR)
    const rate = exchangeRate ? exchangeRate.toFixed(5) : null

    return {
      exchanged: exchangedValue,
      currencySymbol: symbol,
      conversionRate: rate
    }
  }, [amount, exchangeRate, currency])

  const shouldShowTooltip = useMemo(() => {
    return (
      exchangeRate !== null &&
      exchangeRate !== undefined &&
      amount !== null &&
      amount !== undefined &&
      amount !== 0
    )
  }, [exchangeRate, amount])

  const content = (
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

  if (!shouldShowTooltip) {
    return content
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{content}</TooltipTrigger>
      <TooltipContent>
        {renderTooltipContent(exchanged, currencySymbol, conversionRate)}
      </TooltipContent>
    </Tooltip>
  )
}

export default IOTAAmount
