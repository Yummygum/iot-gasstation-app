import { BellDotIcon, SettingsIcon } from 'lucide-react'

import SettingsDialog from '../SettingsDialog'
import TokenBalance from '../TokenBalance'
import { Button } from '../ui/button'
import { DialogTrigger } from '../ui/dialog'
import { Separator } from '../ui/separator'

const SidebarFooterContent = () => {
  return (
    <>
      <footer className="flex w-full flex-col items-center gap-8">
        <Separator />

        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex flex-col gap-1 text-sm">
            <p className="text-md font-medium">Jelle Millenaar</p>
            <TokenBalance />
          </div>

          <div className="flex gap-2">
            <SettingsDialog>
              <DialogTrigger asChild>
                <Button size="icon-lg" variant="ghost">
                  <SettingsIcon className="size-6" />
                </Button>
              </DialogTrigger>
            </SettingsDialog>
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
