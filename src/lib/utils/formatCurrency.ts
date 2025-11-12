type Currency = 'EUR' | 'USD'

/**
 * Formats a currency value as a string with proper decimal separator.
 * EUR uses comma (,) as decimal separator, USD uses dot (.) as decimal separator.
 *
 * @param value - The numeric value to format
 * @param currency - The currency type ('EUR' or 'USD')
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted currency string
 */
export function formatCurrency(
  value: number,
  currency: Currency,
  decimals: number = 2
): string {
  const fixed = value.toFixed(decimals)

  if (currency === 'EUR') {
    return fixed.replace('.', ',')
  }

  return fixed
}

