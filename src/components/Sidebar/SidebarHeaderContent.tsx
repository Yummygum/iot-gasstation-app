import Image from 'next/image'

const SidebarHeaderContent = () => {
  return (
    <div className="flex items-center">
      <Image
        alt="Built with IOTA logo"
        className="dark:invert"
        height={38}
        priority
        src="/built-with-iota.svg"
        width={180}
      />
    </div>
  )
}

export default SidebarHeaderContent
