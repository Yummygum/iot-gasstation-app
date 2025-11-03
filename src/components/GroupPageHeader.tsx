'use client'
import { useFragment } from '@apollo/client/react'
import { graphql } from 'gql.tada'
import { SettingsIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import { Suspense } from 'react'

import { Avatar, AvatarFallback } from './ui/avatar'
import { Button } from './ui/button'
import { SidebarTrigger } from './ui/sidebar'
import { Skeleton } from './ui/skeleton'

const GROUP_FRAGMENT = graphql(`
  fragment GroupFragment on GroupDto {
    name
    groupId
    balance
  }
`)

const GroupPageHeader = () => {
  const params = useParams()

  const { data } = useFragment({
    fragment: GROUP_FRAGMENT,
    from: {
      __typename: 'GroupDto',
      groupId: params.id
    }
  })

  return (
    <header className="flex w-full items-center gap-3 px-6 py-8">
      <Suspense fallback={<GroupPageHeaderSkeleton />}>
        <SidebarTrigger className="-ml-1" />

        <Avatar className="size-12 rounded-md">
          {/* <AvatarImage className="rounded-none" src={logoUrl} /> */}
          <AvatarFallback className="w-full rounded-none text-center">
            {data.name?.charAt(0).toUpperCase()}
            {data.name?.charAt(1).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex w-full flex-col overflow-hidden">
          <h1 className="truncate text-2xl leading-normal font-medium">
            {data.name}
          </h1>
          <p className="text-muted-foreground truncate text-sm">
            Current balance: {data.balance}
          </p>
        </div>

        <Button variant="outline">
          <SettingsIcon />
          Client settings
        </Button>
      </Suspense>
    </header>
  )
}

const GroupPageHeaderSkeleton = () => {
  return (
    <>
      <Skeleton className="size-12 rounded-md" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-4 w-full" />
    </>
  )
}

export default GroupPageHeader
