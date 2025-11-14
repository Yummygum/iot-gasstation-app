'use client'
import { ArrowLeftRight } from 'lucide-react'
import { useMemo, useState } from 'react'

import { useExchangeRate } from '@/contexts/ExchangeRateContext'
import { useSettings } from '@/contexts/SettingsContext'
import { parseNumber } from '@/lib/utils'

import IOTAAmount from './IOTAAmount'

const sanitizeInput = (value: string): string =>
  value
    .replace(/[^0-9,.]/g, '')
    .replace(/[,.]{2,}/g, (str) => str[0])
    .replace(/(?:[,.].*)[,.]/g, (str) => str.slice(0, -1))

/**
 * Formats IOTA amount to max 2 decimals OR 5 characters
 * Returns the formatted value and whether it was truncated
 */
function formatIotaAmount(value: number): {
  formatted: number
  isTruncated: boolean
  exactValue: number
} {
  if (!value || value === 0) {
    return { formatted: 0, isTruncated: false, exactValue: 0 }
  }

  // First, format to 2 decimals
  const twoDecimals = Math.round(value * 100) / 100
  const twoDecimalsString = twoDecimals.toString()

  // If 2 decimals is 5 characters or less, use it
  if (twoDecimalsString.length <= 5) {
    return {
      formatted: twoDecimals,
      isTruncated: Math.abs(twoDecimals - value) > 0.0001,
      exactValue: value
    }
  }

  // Otherwise, truncate to 5 characters
  const truncatedString = twoDecimalsString.slice(0, 5)
  const truncated = parseFloat(truncatedString)

  return {
    formatted: truncated,
    isTruncated: true,
    exactValue: value
  }
}

interface CurrencyConverterProps {
  name?: string
}

const CurrencyConverter = ({ name = 'euroAmount' }: CurrencyConverterProps) => {
  const [euro, setEuro] = useState('')
  const { currency, locale } = useSettings()
  const { exchangeRate } = useExchangeRate()

  const parsedAmount = parseNumber(euro)
  // exchangeRate is how many IOTA per 1 unit of the selected currency
  // To convert currency to IOTA: IOTA = Currency * exchangeRate
  const exactValue = exchangeRate ? parsedAmount * exchangeRate : 0

  const {
    formatted,
    isTruncated,
    exactValue: exactIotaValue
  } = useMemo(() => formatIotaAmount(exactValue), [exactValue])

  return (
    <fieldset className="pb-4 text-center">
      <div className="flex items-center justify-center gap-6 text-5xl font-light text-gray-500">
        <div className="flex items-center gap-2 py-4">
          <span className="text-4xl font-semibold">
            {currency === 'EUR' ? '€' : '$'}
          </span>
          <input
            className="w-32 bg-transparent text-center text-4xl font-light outline-none"
            inputMode="decimal"
            name={name}
            onChange={(event) => setEuro(sanitizeInput(event.target.value))}
            placeholder={currency === 'EUR' ? '00,00' : '00.00'}
            value={euro}
          />
          <input name="iotaAmount" type="hidden" value={exactValue} />
        </div>
        <ArrowLeftRight className="h-8 w-8 text-gray-400" />
        <output
          aria-live="polite"
          className="relative flex w-40 flex-col items-center justify-center"
        >
          <IOTAAmount amount={formatted} hasIOTAMark size="xl" />
          {isTruncated && (
            <p className="text-muted-foreground absolute -bottom-5 mt-1 font-mono text-xs">
              {exactIotaValue.toLocaleString(locale)}
            </p>
          )}
        </output>
      </div>
      <p className="mt-6 text-gray-500">
        {exchangeRate
          ? 'Exchange rates based on current market value'
          : 'Loading rate...'}
      </p>
    </fieldset>
  )
}

export default CurrencyConverter
