import Image from 'next/image'

const Home = () => {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <Image
          alt="Next.js logo"
          className="dark:invert"
          height={38}
          priority
          src="/built-with-iota.svg"
          width={180}
        />
        <h1>IOTA Gas Station</h1>
      </main>
    </div>
  )
}

export default Home
