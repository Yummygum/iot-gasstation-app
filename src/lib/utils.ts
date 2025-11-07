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
