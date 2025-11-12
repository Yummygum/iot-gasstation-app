import { useFragment } from '@apollo/client/react'
import { PlusIcon, SettingsIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import { Suspense } from 'react'

import { graphql } from '../lib/api/graphql'
import AddClientDialog from './AddClientDialog'
import GroupDialog from './GroupDialog'
import IOTAAmount from './IOTAAmount'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'
import { Skeleton } from './ui/skeleton'

const GROUP_FRAGMENT = graphql(`
  fragment GroupFragment on GroupDto {
    name
    logoUri
    metrics {
      allTime {
        totalTransactions
      }
    }
  }
`)

const GroupPageHeader = () => {
  const params = useParams()
  const groupId = (params.id ?? '').toString()

  const { data } = useFragment({
    fragment: GROUP_FRAGMENT,
    from: {
      __typename: 'GroupDto',
      groupId
    }
  })

  return (
    <header className="flex w-full items-center gap-3 px-4 py-8">
      <Suspense fallback={<GroupPageHeaderSkeleton />}>
        {/* <SidebarTrigger className="-ml-1" /> */}

        <Avatar className="size-12 rounded-md">
          {data.logoUri && (
            <AvatarImage className="rounded-none" src={data.logoUri} />
          )}
          <AvatarFallback className="w-full rounded-none text-center">
            {data.name?.charAt(0).toUpperCase()}
            {data.name?.charAt(1).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex w-full flex-col overflow-hidden">
          <h1 className="truncate text-2xl leading-normal font-medium">
            {data.name}
          </h1>
          <p className="text-muted-foreground flex items-center gap-1 truncate text-sm">
            Total transactions:{' '}
            {data.metrics?.allTime?.totalTransactions ? (
              <IOTAAmount
                amount={data.metrics.allTime.totalTransactions}
                hasIOTAMark={false}
                size="xs"
              />
            ) : (
              'Unknown'
            )}
          </p>
        </div>

        <AddClientDialog groupId={groupId}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <PlusIcon />
              Add client
            </Button>
          </DialogTrigger>
        </AddClientDialog>

        <GroupDialog
          groupId={groupId}
          logoUri={data.logoUri || undefined}
          name={data.name}
        >
          <DialogTrigger asChild>
            <Button variant="outline">
              <SettingsIcon />
              Settings
            </Button>
          </DialogTrigger>
        </GroupDialog>
      </Suspense>
    </header>
  )
}

const GroupPageHeaderSkeleton = () => {
  return (
    <header className="flex w-full items-center gap-3 px-6 py-8">
      <Skeleton className="inline-flex size-12 shrink-0 rounded-md" />

      <div className="inline-flex w-full flex-col gap-1">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      <Button disabled variant="outline">
        <SettingsIcon />
        Client settings
      </Button>
    </header>
  )
}

export default GroupPageHeader
