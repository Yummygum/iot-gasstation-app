export function parseNumber(input: string): number {
  if (!input) {
    return 0
  }

  const parsed = parseFloat(input.replace(',', '.'))
  return Number.isNaN(parsed) ? 0 : parsed
}

