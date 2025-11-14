'use client'
import { PlusIcon } from 'lucide-react'

import { GetSponsorWalletQuery } from '@/lib/api/queries/getSponsorWallet'

import AddClientDialog from './AddClientDialog'
import GroupDialog from './GroupDialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'
import { Skeleton } from './ui/skeleton'

interface DashboardHeaderProps {
  walletData?: GetSponsorWalletQuery['getSponsorWallet']
  isLoading: boolean
  totalClients: number
}

const DashboardHeader = ({
  walletData,
  totalClients,
  isLoading
}: DashboardHeaderProps) => {
  if (isLoading || !walletData) {
    return <DashboardHeaderSkeleton />
  }

  return (
    <header className="flex w-full items-center gap-3">
      <Avatar className="size-12 rounded-md">
        {walletData.logoUri ? (
          <AvatarImage className="rounded-none" src={walletData.logoUri} />
        ) : (
          <AvatarFallback className="w-full rounded-none text-center">
            {walletData.name?.[0] ?? ''}
          </AvatarFallback>
        )}
      </Avatar>

      <div className="flex w-full flex-col overflow-hidden">
        <h1 className="truncate text-2xl leading-normal font-medium">
          {walletData.name ?? 'Dashboard'}
        </h1>
        <p className="text-muted-foreground inline-flex items-center gap-2 truncate text-sm">
          <span>
            {walletData.metrics?.allTime?.totalTransactions
              ? `${walletData.metrics?.allTime?.totalTransactions} total transactions`
              : 'No recent transactions'}
          </span>
          <span>-</span>
          <span>
            {totalClients === 1 ? '1 client' : `${totalClients} clients`}
          </span>
        </p>
      </div>

      <div className="flex gap-2">
        <GroupDialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <PlusIcon />
              Create group
            </Button>
          </DialogTrigger>
        </GroupDialog>

        <AddClientDialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <PlusIcon />
              Add client
            </Button>
          </DialogTrigger>
        </AddClientDialog>
      </div>
    </header>
  )
}

const DashboardHeaderSkeleton = () => {
  return (
    <header className="flex w-full items-center gap-3 px-6 py-8">
      <Skeleton className="inline-flex size-12 shrink-0 rounded-md" />

      <div className="inline-flex w-full flex-col gap-1">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      <Button disabled variant="outline">
        <PlusIcon />
        Add group
      </Button>
      <Button disabled variant="outline">
        <PlusIcon />
        Add client
      </Button>
    </header>
  )
}

export default DashboardHeader
