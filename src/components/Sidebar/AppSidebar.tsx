'use client'

import { AvatarFallback } from '@radix-ui/react-avatar'
import { HomeIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps } from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator
} from '@/components/ui/sidebar'

import StatusIndicator from '../StatusIndicator'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import SidebarFooterContent from './SidebarFooterContent'
import SidebarHeaderContent from './SidebarHeaderContent'

// TODO: replace with GQL typing
interface Client {
  id: string
  title: string
  imageUrl: string | null
  status: 'ok' | 'error' | 'warning'
}

const clientsMenu: Client[] = [
  {
    id: 'hogeschool-van-amsterdam',
    title: 'Hogeschool van Amsterdam',
    status: 'ok',
    imageUrl:
      'https://www.emerce.nl/content/uploads/2017/06/Hogeschool_van_amsterdam_logo_svg.png'
  },
  {
    id: 'impierce',
    title: 'Impierce',
    status: 'error',
    imageUrl: null
  }
]

const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  const activeRoute = usePathname()
  const isActive = (route: string) => activeRoute === route

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
              {clientsMenu.map((menuItem) => (
                <SidebarMenuItem
                  className="flex flex-col items-center gap-3"
                  key={menuItem.id}
                >
                  <SidebarSeparator />

                  <Button
                    asChild
                    className="flex items-center gap-2"
                    variant={
                      isActive(`/group/${menuItem.id}`)
                        ? 'ghostActive'
                        : 'ghost'
                    }
                  >
                    <Link
                      className="flex w-full items-center justify-between gap-2.5"
                      href={`/group/${menuItem.id}`}
                    >
                      <span className="flex w-full items-center gap-2.5 truncate">
                        <Avatar className="border-muted size-5 overflow-hidden rounded-sm bg-white">
                          <AvatarImage
                            alt={menuItem.title}
                            src={menuItem.imageUrl ?? ''}
                          />
                          <AvatarFallback className="w-full text-center text-sm">
                            {menuItem.title.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="truncate">{menuItem.title}</span>
                      </span>

                      <StatusIndicator status={menuItem.status} />
                    </Link>
                  </Button>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarFooterContent />
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
