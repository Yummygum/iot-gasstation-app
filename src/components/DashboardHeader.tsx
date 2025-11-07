'use client'
import { PlusIcon } from 'lucide-react'
import { Suspense } from 'react'

import AddClientDialog from './AddClientDialog'
import IOTAAmount from './IOTAAmount'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'
import { Skeleton } from './ui/skeleton'

const DashboardHeader = () => {
  return (
    <header className="flex w-full items-center gap-3">
      <Suspense fallback={<DashboardHeaderSkeleton />}>
        <Avatar className="size-12 rounded-md">
          {/* <AvatarImage className="rounded-none" src={logoUrl} /> */}
          <AvatarFallback className="w-full rounded-none text-center">
            JM
          </AvatarFallback>
        </Avatar>

        <div className="flex w-full flex-col overflow-hidden">
          <h1 className="truncate text-2xl leading-normal font-medium">
            Jelle Millenaar
          </h1>
          <p className="text-muted-foreground truncate text-sm">
            Current balance: <IOTAAmount amount={100} />
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <PlusIcon />
            Add Group
          </Button>

          <AddClientDialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <PlusIcon />
                Add Client
              </Button>
            </DialogTrigger>
          </AddClientDialog>
        </div>
      </Suspense>
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
