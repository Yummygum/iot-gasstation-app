import type { Locale } from 'date-fns'

import {
  differenceInYears,
  format as formatDateFns,
  formatDistanceToNow,
  isValid,
  parseISO
} from 'date-fns'
import { enGB, enUS, nl } from 'date-fns/locale'

/**
 * LocalStorage key for locale preference
 */
const LOCALE_STORAGE_KEY = 'app-locale'

/**
 * Gets the current locale from localStorage or browser default
 * Falls back to 'en-GB' if neither is available
 */
export function getLocale(): string {
  if (typeof window === 'undefined') {
    return 'en-GB'
  }

  // Try to get from localStorage first
  const storedLocale = localStorage.getItem(LOCALE_STORAGE_KEY)
  if (storedLocale) {
    return storedLocale
  }

  // Fall back to browser locale
  const browserLocale =
    navigator.language || navigator.languages?.[0] || 'en-GB'
  return browserLocale
}

/**
 * Sets the locale preference in localStorage
 */
export function setLocale(locale: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  }
}

/**
 * Gets the date-fns locale object from a locale string
 * If no locale is provided, uses the current locale from storage/browser
 */
export function getDateFnsLocale(locale?: string): Locale {
  const localeString = locale || getLocale()
  const localeMap: Record<string, Locale> = {
    'en-US': enUS,
    'en-GB': enGB,
    'nl-NL': nl
  }

  return localeMap[localeString] || enUS
}

/**
 * Helper format function that always applies locale
 * By default uses 'PP' format which formats dates appropriately for the locale
 * Automatically uses the current locale from localStorage or browser default
 */
export function format(
  date: Date,
  formatStr: string = 'PP',
  localeString?: string
): string {
  const locale = getDateFnsLocale(localeString)
  return formatDateFns(date, formatStr, { locale })
}

/**
 * Formats a date to YYYY-MM-DD string using UTC to avoid timezone issues
 */
export function formatDateToDay(date: Date): string {
  // Use UTC methods to ensure consistent formatting regardless of timezone
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Formats a date for display in a medium format (e.g., "Jan 15, 2024")
 * Uses locale-aware formatting via format wrapper
 * Automatically uses the current locale
 */
export function formatDateMedium(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  if (!isValid(dateObj)) {
    return ''
  }

  return format(dateObj, 'PP')
}

/**
 * Formats a date for display in a short format (e.g., "Jan 15")
 * Uses locale-aware formatting via format wrapper
 * Automatically uses the current locale
 */
export function formatDateShort(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  if (!isValid(dateObj)) {
    return ''
  }

  return format(dateObj, 'MMM d')
}

/**
 * Formats a date for tooltip display (e.g., "Jan 15, 2024")
 * Uses locale-aware formatting via formatDateMedium
 * Automatically uses the current locale
 */
export function formatTooltipDate(
  date: Date | string | null | undefined
): string {
  if (!date) {
    return ''
  }

  // formatTooltipDate uses the same format as formatDateMedium, so reuse it
  return formatDateMedium(date)
}

/**
 * Formats the estimated depletion date with special logic:
 * - If date is less than 1 year in the future: show in current notation
 * - If date is 1 year or more in the future: show "In X years" using formatDistanceToNow
 * - If date is invalid/null: return "Unknown"
 * Automatically uses the current locale
 */
// eslint-disable-next-line max-statements
export function formatEstimatedDepletionDate(
  date: string | null | undefined
): string {
  if (!date) {
    return 'Unknown'
  }

  const parsedDate = parseISO(date)
  if (!isValid(parsedDate)) {
    return 'Unknown'
  }

  const localeObj = getDateFnsLocale()
  const yearsUntilDepletion = differenceInYears(parsedDate, new Date())

  // Use formatDistanceToNow for dates >= 1 year, otherwise use medium format
  if (yearsUntilDepletion >= 1) {
    const distance = formatDistanceToNow(parsedDate, {
      addSuffix: true,
      locale: localeObj
    })
    return distance.charAt(0).toUpperCase() + distance.slice(1)
  }

  return formatDateMedium(parsedDate)
}
