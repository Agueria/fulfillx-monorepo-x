'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@fulfillx/ui'
import {
  Package,
  ShoppingCart,
  Truck,
  BarChart3,
  Settings,
  Users,
  Warehouse,
  FileText,
  Zap,
  CreditCard,
  X,
} from 'lucide-react'
import { Button } from '@fulfillx/ui'

const navigation = [
  { name: 'Overview', href: '/', icon: BarChart3 },
  { name: 'Orders', href: '/orders', icon: ShoppingCart },
  { name: 'Inventory', href: '/inventory', icon: Package },
  { name: 'Picking', href: '/picking', icon: Warehouse },
  { name: 'Shipping', href: '/shipping', icon: Truck },
  { name: 'Purchasing', href: '/purchasing', icon: FileText },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Rules', href: '/rules', icon: Zap },
  { name: 'Settings', href: '/settings', icon: Settings },
]

interface SidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => onOpenChange(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b">
          <Link href="/" className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">FulfillX</span>
          </Link>
          
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                )}
                onClick={() => onOpenChange(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Credits display */}
        <div className="p-4 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Shipping Credits</span>
            <span className="font-medium text-accent">$12.75</span>
          </div>
        </div>
      </div>
    </>
  )
}