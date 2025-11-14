'use client'

import { useQuery } from '@apollo/client/react'
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
import { ArrowUpDown, MoreHorizontal, PlusIcon } from 'lucide-react'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import GET_CLIENT_LIST from '@/lib/api/queries/getClientList'
import { tableMeta } from '@/lib/utils'

import AddClientDialog from '../AddClientDialog'
import ConfirmDeleteClientDialog from '../ConfirmDeleteClientDialog'
import IOTAAmount from '../IOTAAmount'
import { Card, CardAction, CardContent, CardHeader } from '../ui/card'
import { DialogTrigger } from '../ui/dialog'
import { ItemDescription, ItemTitle } from '../ui/item'
import { ValueRenderer } from '../ValueRenderer'

interface ClientTableProps {
  groupId?: string
  groupName?: string
}

type ClientColumn = {
  id: string
  amount: number | null
  name: string
  lastTransaction: Date | null
  walletAddress: string
}

type TableMeta = {
  showDeleteClientDialog: boolean
  setShowDeleteClientDialog: Dispatch<SetStateAction<boolean>>
  clientId: string | null
  setClientId: Dispatch<SetStateAction<string | null>>
}
const metaGetter = tableMeta<TableMeta>()

const columns: ColumnDef<ClientColumn>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="sm"
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
          size="sm"
          variant="ghost"
        >
          Last transaction
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const rowValue = row.getValue('lastTransaction') as Date | null
      return (
        <div className="px-3">
          {rowValue ? <ValueRenderer value={rowValue} /> : 'Unknown'}
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
          size="sm"
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
      const meta = metaGetter(table)

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-8 w-8 p-0" variant="ghost">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onSelect={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(client.walletAddress)

                    toast.success('Wallet address copied to clipboard')
                  } else {
                    toast.error(
                      'Copy to clipboard is not supported in your browser'
                    )
                  }
                }}
              >
                Copy wallet address
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="text-medium text-destructive hover:text-destructive hover:bg-destructive/10 focus:text-destructive focus:bg-destructive/10"
                onClick={() => {
                  meta.setClientId(client.id)
                  meta.setShowDeleteClientDialog(true)
                }}
              >
                Delete client
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
    }
  }
]

const ClientTable = ({ groupId, groupName }: ClientTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const [showDeleteClientDialog, setShowDeleteClientDialog] = useState(false)
  const [clientId, setClientId] = useState<string | null>(null)

  const { data: clients } = useQuery(GET_CLIENT_LIST)

  const formattedData: ClientColumn[] = useMemo(() => {
    return (
      clients?.getClientList
        .filter((client) => {
          // If a groupId is provided, filter the clients to only include those in the group
          if (groupId) {
            return client.groupId === groupId
          }

          return true
        })
        .map((client) => ({
          id: client.clientId,
          amount: Number(client.balance),
          name: client.name,
          walletAddress: client.walletAddress,
          lastTransaction: client.metrics.lastTransaction
            ? new Date(client.metrics.lastTransaction)
            : null
        })) ?? []
    )
  }, [clients, groupId])

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
      showDeleteClientDialog,
      setShowDeleteClientDialog,
      clientId,
      setClientId
    }
  })

  return (
    <Card>
      <CardHeader>
        <ItemTitle className="text-xl">
          {groupName ? `Clients of ${groupName}` : 'Clients'}
        </ItemTitle>
        <ItemDescription className="mb-4">
          Quickly go over the clients that use the allocated budget of{' '}
          {groupName ?? 'your account'}.
        </ItemDescription>

        <CardAction>
          <AddClientDialog groupId={groupId}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <PlusIcon />
                Add client
              </Button>
            </DialogTrigger>
          </AddClientDialog>
        </CardAction>

        <Input
          className="max-w-[224px]"
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          placeholder="Filter clients..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
        />
      </CardHeader>
      <CardContent className="mx-4 overflow-hidden rounded-md border px-0">
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
                  className="text-muted-foreground h-24 text-center"
                  colSpan={columns.length}
                >
                  No clients found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <div className="flex items-center justify-end space-x-2 px-6 py-2">
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

      {clientId && (
        <ConfirmDeleteClientDialog
          clientId={clientId}
          onOpenChange={(val) => {
            setShowDeleteClientDialog(val)
            if (!val) {
              setClientId(null)
            }
          }}
          open={showDeleteClientDialog}
        />
      )}
    </Card>
  )
}

export default ClientTable
