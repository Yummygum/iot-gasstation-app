import { Table } from '@tanstack/react-table'

export const tableMeta =
  <Meta extends object>() =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (table: Table<any>) =>
    table.options.meta as Meta

