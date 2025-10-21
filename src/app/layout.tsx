import type { Metadata } from 'next'

import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

import { ApolloWrapper } from './ApolloWrapper'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'IOTA Gas Station',
  description: 'Open Advance Track'
}

const RootLayout = ({
  children
}: Readonly<{
  children: ReactNode
}>) => {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  )
}

export default RootLayout
