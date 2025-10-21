import Image from 'next/image'

const IOTASymbol = ({ size = 32 }: { size?: number }) => {
  return (
    <Image
      alt="IOTA Symbol"
      className="inline-block dark:invert"
      height={size}
      src="/iota-symbol.svg"
      width={size}
    />
  )
}

export default IOTASymbol
