'use client'

import { useSettings } from '@/contexts/SettingsContext'
import { format } from '@/lib/utils/dateUtils'

/**
 * Renders a value formatted based on its type:
 * Numbers are localized, Dates are formatted as dates,
 * and strings are returned as is.
 */
const ValueRenderer = ({ value }: { value: Date | number | string }) => {
  const { locale } = useSettings()
  return valueRenderer(value, locale)
}

const valueRenderer = (value: Date | number | string, locale: string) => {
  if (typeof value === 'number') {
    return value.toLocaleString(locale)
  }

  if (value instanceof Date) {
    return format(value, 'Pp')
  }

  return value
}

/**
 * Hook-based value renderer that uses SettingsContext for locale
 */
export function useValueRenderer() {
  const { locale } = useSettings()
  return (value: Date | number | string) => valueRenderer(value, locale)
}

export { valueRenderer, ValueRenderer }
