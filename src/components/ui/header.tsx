import Image from 'next/image'

import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import IOTASymbol from './IOTASymbol'

const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <Image
        alt="Built with IOTA logo"
        className="dark:invert"
        height={38}
        priority
        src="/built-with-iota.svg"
        width={180}
      />

      <div className="border-muted flex items-stretch gap-2 rounded-md border p-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-1 text-sm">
          <p>James Clear</p>
          <span className="flex items-center">
            <IOTASymbol />
            418,13
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header
