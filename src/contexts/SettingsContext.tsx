'use client'

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

import {
  getLocale,
  setLocale as setDateUtilsLocale
} from '@/lib/utils/dateUtils'

export type Currency = 'EUR' | 'USD'

const CURRENCY_STORAGE_KEY = 'app-currency'

/**
 * Gets the current currency from localStorage
 * Falls back to 'EUR' if not available
 */
function getCurrency(): Currency {
  if (typeof window === 'undefined') {
    return 'EUR'
  }

  const storedCurrency = localStorage.getItem(CURRENCY_STORAGE_KEY)
  if (storedCurrency === 'EUR' || storedCurrency === 'USD') {
    return storedCurrency
  }

  return 'EUR'
}

/**
 * Sets the currency preference in localStorage
 */
function setCurrencyStorage(currency: Currency): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CURRENCY_STORAGE_KEY, currency)
  }
}

interface SettingsContextType {
  locale: string
  currency: Currency
  // eslint-disable-next-line no-unused-vars
  setLocale: (locale: string) => void
  // eslint-disable-next-line no-unused-vars
  setCurrency: (currency: Currency) => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
)

interface SettingsProviderProps {
  children: ReactNode
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  // Initialize locale from localStorage or browser default
  const [locale, setLocaleState] = useState<string>(() => {
    if (typeof window === 'undefined') {
      return 'en-GB'
    }

    return getLocale()
  })

  // Initialize currency from localStorage
  const [currency, setCurrencyState] = useState<Currency>(() => {
    return getCurrency()
  })

  const setLocale = (newLocale: string) => {
    setLocaleState(newLocale)
    setDateUtilsLocale(newLocale)
  }

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency)
    setCurrencyStorage(newCurrency)
  }

  // Listen for storage changes (in case locale or currency is changed in another tab)
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'app-locale' && event.newValue) {
        setLocaleState(event.newValue)
      }

      if (event.key === CURRENCY_STORAGE_KEY && event.newValue) {
        if (event.newValue === 'EUR' || event.newValue === 'USD') {
          setCurrencyState(event.newValue)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return (
    <SettingsContext.Provider
      value={{ locale, currency, setLocale, setCurrency }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }

  return context
}
