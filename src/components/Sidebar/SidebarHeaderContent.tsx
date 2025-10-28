import Image from 'next/image'

const SidebarHeaderContent = () => {
  return (
    <div className="flex items-center justify-center">
      <Image
        alt="IOTA Gas Station logo"
        className="dark:invert"
        height={38}
        priority
        src="/iota-gas-logo.svg"
        width={120}
      />
    </div>
  )
}

export default SidebarHeaderContent
