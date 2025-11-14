import type { Metadata } from 'next'

import { Inter } from 'next/font/google'
import { CSSProperties, ReactNode } from 'react'

import AppSidebar from '@/components/Sidebar/AppSidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { ExchangeRateProvider } from '@/contexts/ExchangeRateContext'
import { SettingsProvider } from '@/contexts/SettingsContext'

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
          <SettingsProvider>
            <ExchangeRateProvider>
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
                  <div className="flex flex-1 flex-col overscroll-none">
                    <div className="@container/main flex flex-1 flex-col gap-2 overscroll-none">
                      {children}
                    </div>
                  </div>
                </SidebarInset>

                <div className="pointer-events-none fixed top-0 left-0 -z-10 size-full [background:linear-gradient(146deg,rgba(181,210,251,0.20)-0.5%,rgba(255,255,255,0.00)41.3%,rgba(163,189,251,0.50)77.12%)]" />
              </SidebarProvider>
            </ExchangeRateProvider>
          </SettingsProvider>
        </ApolloWrapper>

        <Toaster />
      </body>
    </html>
  )
}

export default RootLayout
