import TokenBalance from '../TokenBalance'
import { Avatar, AvatarImage } from '../ui/avatar'

const SidebarFooterContent = () => {
  return (
    <>
      <footer className="flex w-full flex-col items-center gap-2">
        <div className="bg- flex w-full items-center gap-4 rounded-md border p-2">
          <Avatar className="size-10 rounded-md">
            <AvatarImage className="rounded-none" src="/impierce-logo.jpg" />
          </Avatar>

          <div className="flex w-full flex-col gap-1 text-sm">
            <p className="text-md text- font-semibold">Jelle Millenaar</p>
            <TokenBalance />
          </div>

          {/* <div className="flex gap-2">
            <Button size="icon-lg" variant="ghost">
              <BellDotIcon className="size-4" />
            </Button>
          </div> */}
        </div>
      </footer>
    </>
  )
}

export default SidebarFooterContent
