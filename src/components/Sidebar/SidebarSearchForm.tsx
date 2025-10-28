import { Search } from 'lucide-react'
import { ComponentProps } from 'react'

import { Label } from '@/components/ui/label'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput
} from '@/components/ui/sidebar'

const SidebarSearchForm = ({ ...props }: ComponentProps<'form'>) => {
  return (
    <form {...props}>
      <SidebarGroup className="py-2">
        <SidebarGroupContent className="relative">
          <Label className="sr-only" htmlFor="search">
            Search
          </Label>
          <SidebarInput
            className="pl-8"
            id="search"
            placeholder="Search client..."
          />
          <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  )
}

export default SidebarSearchForm
