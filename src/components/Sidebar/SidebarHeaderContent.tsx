import Image from 'next/image'

const SidebarHeaderContent = () => {
  return (
    <div className="flex items-center py-4">
      <Image
        alt="IOTA Gas Station logo"
        className="dark:invert"
        height={38}
        priority
        src="/iota-gas-logo.svg"
        width={140}
      />
    </div>
  )
}

export default SidebarHeaderContent
