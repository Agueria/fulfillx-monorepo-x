'use client'

import { Button } from '@fulfillx/ui'
import { Plus, Download, Filter } from 'lucide-react'

export function OrdersHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">
          Manage and track all your orders from one place
        </p>
      </div>

      <div className="flex items-center space-x-3">
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
        
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Order
        </Button>
      </div>
    </div>
  )
}