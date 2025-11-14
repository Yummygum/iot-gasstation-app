import Image from 'next/image'

const SidebarHeaderContent = () => {
  return (
    <div className="flex items-center py-4">
      <Image
        alt="IOTA Gas Station logo"
        className="dark:invert"
        height={24}
        priority
        src="/iota-logo.svg"
        width={92}
      />
    </div>
  )
}

export default SidebarHeaderContent
