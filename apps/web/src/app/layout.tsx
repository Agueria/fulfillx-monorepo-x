import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FulfillX - Complete Shipping & Inventory Management Platform',
  description: 'Streamline your e-commerce operations with our all-in-one shipping, inventory, and order management solution. Connect all your sales channels and carriers in one place.',
  keywords: 'shipping software, inventory management, order fulfillment, e-commerce, multichannel, warehouse management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}