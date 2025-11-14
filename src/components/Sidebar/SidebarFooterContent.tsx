'use client'

import {
  LogOutIcon,
  SettingsIcon,
  UserPlusIcon,
  UsersIcon,
  WalletIcon
} from 'lucide-react'

import AddClientDialog from '../AddClientDialog'
import AddFundsDialog from '../AddFundsDialog'
import GroupDialog from '../GroupDialog'
import TokenBalance from '../TokenBalance'
import { Avatar, AvatarImage } from '../ui/avatar'
import { DialogTrigger } from '../ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'

const SidebarFooterContent = () => {
  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logout clicked')
  }

  const handleSettings = () => {
    // TODO: Implement settings navigation
  }

  return (
    <footer className="flex w-full flex-col items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="hover:bg-accent flex w-full cursor-pointer items-center gap-4 rounded-md border p-2 transition-colors">
            <Avatar className="size-10 rounded-md">
              <AvatarImage className="rounded-none" src="/impierce-logo.jpg" />
            </Avatar>

            <div className="flex w-full flex-col gap-1 text-sm">
              <p className="text-md font-semibold">Jelle Millenaar</p>
              <TokenBalance />
            </div>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="center"
          className="w-(--sidebar-width)"
          side="top"
        >
          <DropdownMenuItem disabled onClick={handleSettings}>
            <SettingsIcon />
            Settings
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <AddFundsDialog>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
                <WalletIcon />
                Top up funds
              </DropdownMenuItem>
            </DialogTrigger>
          </AddFundsDialog>

          <GroupDialog>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
                <UsersIcon />
                Create group
              </DropdownMenuItem>
            </DialogTrigger>
          </GroupDialog>

          <AddClientDialog>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
                <UserPlusIcon />
                Add client
              </DropdownMenuItem>
            </DialogTrigger>
          </AddClientDialog>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="hover:bg-descructive"
            disabled
            onClick={handleLogout}
          >
            <LogOutIcon />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </footer>
  )
}

export default SidebarFooterContent
