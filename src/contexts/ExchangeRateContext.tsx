'use client'

import { useQuery } from '@apollo/client/react'
import { createContext, ReactNode, useContext, useMemo } from 'react'

import { useApolloSubscription } from '@/hooks/useApolloSubscription'
import { GET_CONVERSION_RATES } from '@/lib/api/queries/getConversionRates'
import CONVERSION_RATES_SUBSCRIPTION from '@/lib/api/subscriptions/conversionRatesUpdates'

import { useSettings } from './SettingsContext'

interface ExchangeRateContextType {
  exchangeRate: number | null
}

const ExchangeRateContext = createContext<ExchangeRateContextType>({
  exchangeRate: null
})

export const ExchangeRateProvider = ({ children }: { children: ReactNode }) => {
  const { currency } = useSettings()
  const { data, subscribeToMore } = useQuery(GET_CONVERSION_RATES)

  useApolloSubscription({
    subscribeToMore,
    document: CONVERSION_RATES_SUBSCRIPTION,
    onUpdate: (prev, update) => ({
      ...prev,
      ...update.conversionRateUpdates
    })
  })

  const exchangeRate = useMemo(() => {
    if (!data?.getConversionRates) {
      return null
    }

    const rates = data.getConversionRates

    // Get the conversion rate: how many IOTA per 1 unit of the selected currency
    // e.g., eurToIot means how many IOTA you get for 1 EUR
    const rate = currency === 'EUR' ? rates.eurToIot : rates.usdToIot

    if (!rate || rate === 0) {
      return null
    }

    return rate
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
