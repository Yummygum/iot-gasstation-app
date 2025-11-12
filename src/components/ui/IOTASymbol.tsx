import Image from 'next/image'

import { cn } from '@/lib/utils'

const IOTASymbol = ({
  className,
  size = 32,
  isInverted = false
}: {
  className?: string
  size?: number
  isInverted?: boolean
}) => {
  return (
    <Image
      alt="IOTA Symbol"
      className={cn('inline-block', className)}
      height={size}
      src={isInverted ? '/iota-symbol-inverted.svg' : '/iota-symbol.svg'}
      width={size}
    />
  )
}

export default IOTASymbol
