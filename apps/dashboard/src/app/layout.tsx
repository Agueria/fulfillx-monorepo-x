import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { DashboardLayout } from '@/components/layout/dashboard-layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FulfillX Dashboard - Order & Inventory Management',
  description: 'Manage your orders, inventory, shipping, and analytics from one powerful dashboard.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <DashboardLayout>
            {children}
          </DashboardLayout>
        </Providers>
      </body>
    </html>
  )
}