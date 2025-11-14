'use client'

import { useQuery } from '@apollo/client/react'
import { createContext, ReactNode, useContext, useMemo } from 'react'

import { GET_IOTA_PRICE_QUERY } from '@/lib/api/queries/getIotaPrice'

import { useCurrency } from './CurrencyContext'

interface ExchangeRateContextType {
  exchangeRate: number | null
}

const ExchangeRateContext = createContext<ExchangeRateContextType>({
  exchangeRate: null
})

export const ExchangeRateProvider = ({ children }: { children: ReactNode }) => {
  const { currency } = useCurrency()
  const { data } = useQuery(GET_IOTA_PRICE_QUERY)

  const exchangeRate = useMemo(() => {
    if (!data) {
      return null
    }

    // API returns the price of 1 IOTA in the selected currency (e.g., 0.1196 EUR per IOTA)
    // We need to invert it to get IOTA per currency unit (e.g., 8.36400 IOTA per EUR)
    const pricePerIota = currency === 'EUR' ? data.getIotaEurPrice : data.getIotaUsdPrice
    
    if (!pricePerIota || pricePerIota === 0) {
      return null
    }

    return 1 / pricePerIota
  }, [data, currency])

  return (
    <ExchangeRateContext.Provider value={{ exchangeRate }}>
      {children}
    </ExchangeRateContext.Provider>
  )
}

export const useExchangeRate = () => {
  return useContext(ExchangeRateContext)
}
