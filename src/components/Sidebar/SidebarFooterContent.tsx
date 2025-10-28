import { BellDotIcon } from 'lucide-react'

import TokenBalance from '../TokenBalance'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

const SidebarFooterContent = () => {
  return (
    <>
      <footer className="flex w-full flex-col items-center gap-8">
        <Separator />

        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex flex-col gap-1 text-sm">
            <p className="text-md font-medium">James Clear</p>
            <TokenBalance />
          </div>

          <div className="flex gap-2">
            <Button size="icon-lg" variant="ghost">
              <BellDotIcon className="size-6" />
            </Button>
          </div>
        </div>
      </footer>
    </>
  )
}

export default SidebarFooterContent
