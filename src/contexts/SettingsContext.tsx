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

interface SettingsContextType {
  locale: string
  // eslint-disable-next-line no-unused-vars
  setLocale: (locale: string) => void
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
      return 'en-US'
    }

    return getLocale()
  })

  const setLocale = (newLocale: string) => {
    setLocaleState(newLocale)
    setDateUtilsLocale(newLocale)
  }

  // Listen for storage changes (in case locale is changed in another tab)
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'app-locale' && event.newValue) {
        setLocaleState(event.newValue)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return (
    <SettingsContext.Provider value={{ locale, setLocale }}>
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
