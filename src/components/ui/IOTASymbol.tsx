import Image from 'next/image'

import { cn } from '@/lib/utils'

const IOTASymbol = ({
  className,
  size = 32
}: {
  className?: string
  size?: number
}) => {
  return (
    <Image
      alt="IOTA Symbol"
      className={cn('inline-block dark:invert', className)}
      height={size}
      src="/iota-symbol.svg"
      width={size}
    />
  )
}

export default IOTASymbol
