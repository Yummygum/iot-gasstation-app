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

    return currency === 'EUR' ? data.getIotaEurPrice : data.getIotaUsdPrice
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
