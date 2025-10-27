import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

import TokenBalance from '../TokenBalance'

const SidebarFooterContent = () => {
  return (
    <div className="flex items-center py-2">
      <div className="flex gap-2">
        <Avatar className="border-muted size-14 overflow-hidden rounded-sm">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-1 text-sm">
          <p>James Clear</p>
          <TokenBalance />
        </div>
      </div>
    </div>
  )
}

export default SidebarFooterContent
