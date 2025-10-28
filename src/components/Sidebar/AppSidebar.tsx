'use client'

import { AvatarFallback } from '@radix-ui/react-avatar'
import { ChevronRight, Users } from 'lucide-react'
import Link from 'next/link'
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
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator
} from '@/components/ui/sidebar'

import { Avatar } from '../ui/avatar'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '../ui/collapsible'
import SidebarFooterContent from './SidebarFooterContent'
import SidebarHeaderContent from './SidebarHeaderContent'
import SidebarSearchForm from './SidebarSearchForm'

const clientsMenu = [
  {
    title: 'Hogeschool van Amsterdam',
    url: '#',
    icon: Users,
    items: [
      {
        title: 'ASS',
        url: '/client/ASS'
      },
      {
        title: 'B&E',
        url: '/client/B&E',
        isActive: true
      },
      {
        title: 'EDU',
        url: '/client/EDU'
      },
      {
        title: 'CMD',
        url: '/client/CMD'
      }
    ]
  }
]

const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarHeaderContent />
      </SidebarHeader>

      <SidebarContent>
        <SidebarSearchForm />

        <SidebarSeparator className="m-0" />

        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              <SidebarMenuItem className="flex items-center gap-2">
                <Link href="/">Dashboard</Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Clients</SidebarGroupLabel>
          {clientsMenu.map((menuItem) => (
            <Collapsible
              className="group/collapsible"
              key={menuItem.title}
              role="group"
              title={menuItem.title}
            >
              <SidebarGroup className="group-data-[state=open]/collapsible:bg-sidebar-accent rounded-md">
                <SidebarGroupLabel
                  asChild
                  className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
                >
                  <CollapsibleTrigger className="flex cursor-pointer items-center gap-2">
                    <Avatar className="border-muted size-4 overflow-hidden rounded-full bg-blue-200">
                      <AvatarFallback />
                    </Avatar>
                    <span className="w-full truncate text-left">
                      {menuItem.title}
                    </span>
                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {menuItem.items?.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild isActive={item.isActive}>
                            <Link href={item.url}>{item.title}</Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          ))}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarFooterContent />
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
