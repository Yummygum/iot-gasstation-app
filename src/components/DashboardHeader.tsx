'use client'
import { useFragment } from '@apollo/client/react'
import { PlusIcon } from 'lucide-react'

import { graphql } from '@/lib/api/graphql'

import AddClientDialog from './AddClientDialog'
import GroupDialog from './GroupDialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'
import { Skeleton } from './ui/skeleton'

interface DashboardHeaderProps {
  sponsorWalletId?: string
  isLoading: boolean
  totalClients: number
}

const DASHBOARD_HEADER_WALLET_FRAGMENT = graphql(`
  fragment DashboardHeaderFragment on SponsorWalletDto {
    name
    logoUri
    metrics {
      allTime {
        totalTransactions
      }
    }
  }
`)

const DashboardHeader = ({
  sponsorWalletId,
  totalClients,
  isLoading
}: DashboardHeaderProps) => {
  const { data, dataState } = useFragment({
    fragment: DASHBOARD_HEADER_WALLET_FRAGMENT,
    from: {
      __typename: 'SponsorWalletDto',
      sponsorWalletId
    }
  })

  const walletName = data?.name || 'Sponsor Wallet'
  const walletAvatar = data?.logoUri || undefined
  const initials = walletName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  if (isLoading || dataState !== 'complete') {
    return <DashboardHeaderSkeleton />
  }

  return (
    <header className="flex w-full items-center gap-3">
      <Avatar className="size-12 rounded-md">
        {data.logoUri ? (
          <AvatarImage className="rounded-none" src={walletAvatar} />
        ) : (
          <AvatarFallback className="bg-primary text-primary-foreground w-full rounded-none text-center">
            {initials}
          </AvatarFallback>
        )}
      </Avatar>

      <div className="flex w-full flex-col overflow-hidden">
        <h1 className="truncate text-2xl leading-normal font-medium">
          {data.name ?? 'Dashboard'}
        </h1>
        <p className="text-muted-foreground inline-flex items-center gap-2 truncate text-sm">
          <span>
            {data.metrics?.allTime?.totalTransactions
              ? `${data.metrics?.allTime?.totalTransactions} total transactions`
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
