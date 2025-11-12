'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

export type Currency = 'EUR' | 'USD'

interface CurrencyContextType {
  currency: Currency
  // eslint-disable-next-line no-unused-vars
  setCurrency: (currency: Currency) => void
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
)

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>('EUR')

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrency = () => {
  const context = useContext(CurrencyContext)

  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider')
  }

  return context
}
