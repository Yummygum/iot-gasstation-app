'use client'
import { ArrowLeftRight } from 'lucide-react'
import { useEffect, useState } from 'react'

import { parseNumber } from '@/lib/utils'

import IOTAAmount from './IOTAAmount'

// Mock Function
async function fetchExchangeRate(): Promise<number> {
  return new Promise((resolve) => {
    // Simulate network latency using setTimeout (140ms delay)
    setTimeout(() => resolve(8.57), 2000)
  })
}

const sanitizeInput = (value: string): string =>
  value
    .replace(/[^0-9,.]/g, '')
    .replace(/[,.]{2,}/g, (str) => str[0])
    .replace(/(?:[,.].*)[,.]/g, (str) => str.slice(0, -1))

const CurrencyConverter = () => {
  const [euro, setEuro] = useState('')
  const [rate, setRate] = useState<number | null>(null)

  useEffect(() => {
    const loadRate = async () => {
      try {
        setRate(await fetchExchangeRate())
      } catch {
        setRate(null)
      }
    }

    loadRate()
  }, [])

  const parsedEuro = parseNumber(euro)
  const computedValue = rate ? +(parsedEuro * rate).toFixed(2) : 0

  return (
    <fieldset className="text-center">
      <div className="flex items-center justify-center gap-6 text-5xl font-light text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-4xl font-semibold">€</span>
          <input
            className="w-32 bg-transparent text-center text-4xl font-light outline-none"
            inputMode="decimal"
            onChange={(event) => setEuro(sanitizeInput(event.target.value))}
            placeholder="0,00"
            value={euro}
          />
        </div>
        <ArrowLeftRight className="h-8 w-8 text-gray-400" />
        <output
          aria-live="polite"
          className="flex w-40 items-center justify-center"
        >
          <IOTAAmount amount={computedValue} hasIOTAMark size="xl" />
        </output>
      </div>
      <p className="mt-6 text-gray-500">
        {rate
          ? 'Exchange rates based on current market value'
          : 'Loading rate...'}
      </p>
    </fieldset>
  )
}

export default CurrencyConverter
