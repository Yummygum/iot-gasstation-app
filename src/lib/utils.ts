import type { ClassValue } from 'clsx'

import { Table } from '@tanstack/react-table'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseNumber(input: string): number {
  if (!input) {
    return 0
  }

  const parsed = parseFloat(input.replace(',', '.'))
  return Number.isNaN(parsed) ? 0 : parsed
}

export const tableMeta =
  <Meta extends object>() =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (table: Table<any>) =>
    table.options.meta as Meta

// eslint-disable-next-line max-statements
export function normalizeClientUrl(raw: string): string {
  const input = (raw || '').trim()
  if (!input) {
    return ''
  }

  const schemeMatch = input.match(/^(?:https?:\/\/)/i)
  const scheme = schemeMatch ? schemeMatch[0].toLowerCase() : ''
  const withoutScheme = input.replace(/^https?:\/\//i, '')

  const [firstPart] = withoutScheme.split('/')
  const [noQuery] = firstPart.split('?')
  const [hostOnly] = noQuery.split('#')

  if (!hostOnly) {
    return input
  }

  const hadSlashAfterHost = withoutScheme.startsWith(`${hostOnly}/`)
  return `${scheme}${hostOnly}${hadSlashAfterHost ? '/' : ''}`
}
