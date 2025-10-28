'use client'

import { AvatarFallback } from '@radix-ui/react-avatar'
import { ChevronRight, Home, Search, Users } from 'lucide-react'
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

// Menu items.
const menu = [
  {
    title: 'Dashboard',
    url: '#',
    icon: Home
  },
  {
    title: 'Hogeschool van Amsterdam',
    url: '#',
    icon: Users,
    items: [
      {
        title: 'ASS',
        url: '#'
      },
      {
        title: 'B&E',
        url: '#',
        isActive: true
      },
      {
        title: 'EDU',
        url: '#'
      },
      {
        title: 'CMD',
        url: '#'
      }
    ]
  },
  {
    title: 'Rulesets',
    url: '#',
    icon: Search
  }
]

const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarHeaderContent />
      </SidebarHeader>

      <SidebarContent className="flex flex-col gap-2">
        <SidebarSearchForm />

        <SidebarSeparator />

        {menu.map((menuItem) => (
          <Collapsible
            className="group/collapsible overflow-hidden"
            key={menuItem.title}
            role="group"
            title={menuItem.title}
          >
            <SidebarGroup className="group-data-[state=open]/collapsible:bg-sidebar-accent rounded-md p-2">
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
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarFooterContent />
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
