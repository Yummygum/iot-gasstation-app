import type { Metadata } from 'next'

import { Inter } from 'next/font/google'
import { CSSProperties, ReactNode } from 'react'

import AppSidebar from '@/components/Sidebar/AppSidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'

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
        <ApolloWrapper>
          <SidebarProvider
            style={
              {
                '--sidebar-width': '288px',
                '--header-height': 'calc(var(--spacing) * 12)'
              } as CSSProperties
            }
          >
            <AppSidebar variant="inset" />

            <SidebarInset>
              <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                  {children}
                </div>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </ApolloWrapper>

        <Toaster />
      </body>
    </html>
  )
}

export default RootLayout
