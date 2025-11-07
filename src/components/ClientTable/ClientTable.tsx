'use client'

import { useMutation, useQuery } from '@apollo/client/react'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState
} from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'

import type {
  RemoveClientMutationResult,
  RemoveClientMutationVariables
} from '@/lib/api/mutations/removeClient'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import REMOVE_CLIENT_MUTATION from '@/lib/api/mutations/removeClient'
import GET_CLIENT from '@/lib/api/queries/getClient'
import GET_CLIENT_LIST from '@/lib/api/queries/getClientList'
import { tableMeta } from '@/lib/utils'

import IOTAAmount from '../IOTAAmount'
import { ValueRenderer } from '../ValueRenderer'

type ClientColumn = {
  id: string
  amount: number | null
  name: string
  lastTransaction: Date
}

type RemoveClientMutationFn = (_options?: {
  variables: RemoveClientMutationVariables
}) => Promise<{ data?: RemoveClientMutationResult }>

type TableMeta = {
  removeClient: RemoveClientMutationFn
}
const metaGetter = tableMeta<TableMeta>()

const columns: ColumnDef<ClientColumn>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          variant="ghost"
        >
          Name
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="px-3 capitalize">{row.getValue('name')}</div>
    )
  },
  {
    accessorKey: 'lastTransaction',
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          variant="ghost"
        >
          Last transaction
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const rowValue = row.getValue('lastTransaction') as Date
      return (
        <div className="px-3">
          <ValueRenderer value={rowValue} />
        </div>
      )
    }
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          variant="ghost"
        >
          Amount
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="px-3">
          <IOTAAmount amount={row.getValue('amount')} />
        </div>
      )
    }
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row, table }) => {
      const client = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0" variant="ghost">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(client.id)}
            >
              Copy client ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                const { removeClient } = metaGetter(table)

                removeClient({
                  variables: {
                    clientId: client.id
                  }
                })
              }}
            >
              Delete client
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

const ClientTable = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const { data: clients } = useQuery(GET_CLIENT_LIST)

  const [removeClient] = useMutation(REMOVE_CLIENT_MUTATION, {
    refetchQueries: [GET_CLIENT_LIST, GET_CLIENT]
  })

  const formattedData: ClientColumn[] = useMemo(() => {
    // TODO: add missing fields
    return (
      clients?.getClientList.map((client) => ({
        id: client.clientId,
        amount: client.balance,
        name: client.name,
        // walletAddress: client.walletAddress,
        // groupId: client.groupId,
        // clientId: client.clientId,
        lastTransaction: new Date()
      })) ?? []
    )
  }, [clients])

  const table = useReactTable({
    data: formattedData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    },
    meta: {
      removeClient
    }
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          className="max-w-sm"
          onChange={(event) =>
            table
              .getColumn('lastTransaction')
              ?.setFilterValue(event.target.value)
          }
          placeholder="Search clients..."
          value={
            (table.getColumn('lastTransaction')?.getFilterValue() as string) ??
            ''
          }
        />
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            size="sm"
            variant="outline"
          >
            Previous
          </Button>
          <Button
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            size="sm"
            variant="outline"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ClientTable
