import { LOCALE } from '@/lib/constants'

/**
 * Renders a value formatted based on its type:
 * Numbers are localized, Dates are formatted as dates,
 * and strings are returned as is.
 */
const ValueRenderer = ({ value }: { value: Date | number | string }) => {
  if (typeof value === 'number') {
    return value.toLocaleString(LOCALE)
  }

  if (value instanceof Date) {
    return value.toLocaleDateString(LOCALE, {
      dateStyle: 'medium'
    })
  }

  return value
}

export default ValueRenderer
