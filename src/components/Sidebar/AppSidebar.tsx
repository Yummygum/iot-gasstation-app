'use client'

import { useQuery } from '@apollo/client/react'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { AlertCircle, HomeIcon, RefreshCw, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps } from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator
} from '@/components/ui/sidebar'
import GET_GROUP_LIST from '@/lib/api/queries/getGroupList'
import GET_SPONSOR_WALLET from '@/lib/api/queries/getSponsorWallet'

import StatusIndicator from '../StatusIndicator'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle
} from '../ui/empty'
import { Skeleton } from '../ui/skeleton'
import SidebarFooterContent from './SidebarFooterContent'
import SidebarHeaderContent from './SidebarHeaderContent'

// Loading skeleton component for client items
const ClientItemSkeleton = () => (
  <SidebarGroup className="rounded-md px-1 py-4">
    <SidebarGroupLabel className="text-sm">
      <div className="flex w-full cursor-pointer items-center justify-center gap-2.5">
        <Skeleton className="size-6 rounded-sm" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="ml-auto size-2 self-end" />
      </div>
    </SidebarGroupLabel>
  </SidebarGroup>
)

// Error state component for client list
const ClientListError = ({ onRetry }: { onRetry: () => void }) => (
  <SidebarGroup className="group-data-[collapsible=icon]:hidden">
    <Empty className="border-none p-4">
      <EmptyContent>
        <EmptyMedia variant="icon">
          <AlertCircle className="text-destructive" />
        </EmptyMedia>
        <EmptyTitle className="text-sm">Failed to load clients</EmptyTitle>
        <EmptyDescription className="text-xs">
          Unable to fetch client list.
          <button
            className="text-primary ml-1 inline-flex items-center gap-1 hover:underline"
            onClick={onRetry}
          >
            <RefreshCw className="h-3 w-3" />
            Try again
          </button>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  </SidebarGroup>
)

// eslint-disable-next-line no-unused-vars
const ClientList = ({ isActive }: { isActive: (route: string) => boolean }) => {
  const { data, loading, error, refetch, dataState } = useQuery(GET_GROUP_LIST)

  const handleRetry = () => {
    refetch()
  }

  if (loading || dataState === 'empty') {
    return (
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        {/* Show 3 skeleton items while loading */}
        {Array.from({ length: 3 }).map((_, idx) => (
          <ClientItemSkeleton key={`skeleton-${idx}`} />
        ))}
      </SidebarGroup>
    )
  }

  if (error) {
    return <ClientListError onRetry={handleRetry} />
  }

  if (!data?.getGroupList?.length) {
    return (
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <Empty className="border-none p-4">
          <EmptyContent>
            <EmptyMedia variant="icon">
              <Users />
            </EmptyMedia>
            <EmptyTitle className="text-sm">No clients found</EmptyTitle>
            <EmptyDescription className="text-xs">
              No groups are available at the moment.
            </EmptyDescription>
          </EmptyContent>
        </Empty>
      </SidebarGroup>
    )
  }

  return (
    <SidebarGroup className="gap-3 group-data-[collapsible=icon]:hidden">
      {data.getGroupList.map((menuItem, idx) => (
        <SidebarMenuItem
          className="flex flex-col items-center gap-3"
          key={(menuItem.groupId as string) ?? idx}
        >
          <SidebarSeparator />

          <Button
            asChild
            className="flex items-center gap-2"
            variant={
              isActive(`/group/${menuItem.groupId}`) ? 'ghostActive' : 'ghost'
            }
          >
            <Link
              className="flex w-full items-center justify-between gap-2.5"
              href={`/group/${menuItem.groupId}`}
            >
              <span className="flex w-full items-center gap-2.5 truncate">
                <Avatar className="border-muted size-6 overflow-hidden rounded-sm border bg-white">
                  {menuItem.logoUri && (
                    <AvatarImage
                      alt={menuItem.name}
                      className="m-0.5 h-auto w-full rounded-none object-contain object-center"
                      src={menuItem.logoUri}
                    />
                  )}
                  <AvatarFallback className="bg-primary text-primary-foreground flex w-full items-center justify-center text-center text-xs">
                    {menuItem.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate">{menuItem.name}</span>
              </span>

              <StatusIndicator
                status={
                  menuItem.status.variant as 'action' | 'warning' | 'success'
                }
              />
            </Link>
          </Button>
        </SidebarMenuItem>
      ))}
    </SidebarGroup>
  )
}

const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  const activeRoute = usePathname()
  const isActive = (route: string) => activeRoute === route
  const { data } = useQuery(GET_SPONSOR_WALLET)

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarHeaderContent />
      </SidebarHeader>

      <SidebarContent className="gap-4">
        <SidebarSeparator className="m-0" />

        <SidebarGroup className="p-0">
          <SidebarMenuItem>
            <Button
              asChild
              className="flex items-center justify-start gap-2.5"
              variant={isActive('/') ? 'ghostActive' : 'ghost'}
            >
              <Link href="/">
                <HomeIcon />
                <span>Dashboard</span>
              </Link>
            </Button>
          </SidebarMenuItem>
        </SidebarGroup>

        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-3">
              <ClientList isActive={isActive} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarFooterContent walletData={data?.getSponsorWallet} />
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
