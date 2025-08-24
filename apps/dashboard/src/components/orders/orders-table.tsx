'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, Button } from '@fulfillx/ui'
import { Badge } from '@fulfillx/ui'
import { MoreHorizontal, Eye, Copy, Truck } from 'lucide-react'
import { formatCurrency, formatDateTime } from '@fulfillx/ui'

// Mock data - replace with actual API call
const mockOrders = [
  {
    id: 'ORD-000001',
    customerEmail: 'customer1@example.com',
    status: 'NEW',
    total: 89.99,
    items: 2,
    createdAt: new Date('2024-01-15T10:30:00'),
    shippingAddress: {
      city: 'New York',
      state: 'NY'
    }
  },
  {
    id: 'ORD-000002',
    customerEmail: 'customer2@example.com',
    status: 'READY_TO_SHIP',
    total: 156.50,
    items: 1,
    createdAt: new Date('2024-01-15T09:15:00'),
    shippingAddress: {
      city: 'Los Angeles',
      state: 'CA'
    }
  },
  {
    id: 'ORD-000003',
    customerEmail: 'customer3@example.com',
    status: 'DISPATCHED',
    total: 234.75,
    items: 3,
    createdAt: new Date('2024-01-14T16:45:00'),
    shippingAddress: {
      city: 'Chicago',
      state: 'IL'
    }
  },
]

const statusColors = {
  NEW: 'bg-blue-100 text-blue-800',
  READY_TO_SHIP: 'bg-orange-100 text-orange-800',
  LABEL_PURCHASED: 'bg-purple-100 text-purple-800',
  DISPATCHED: 'bg-green-100 text-green-800',
  DELIVERED: 'bg-emerald-100 text-emerald-800',
  CANCELLED: 'bg-red-100 text-red-800',
}

export function OrdersTable() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])

  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Orders</CardTitle>
          <div className="flex items-center space-x-2">
            <select className="text-sm border border-border rounded px-3 py-1">
              <option>All Orders</option>
              <option>New</option>
              <option>Ready to Ship</option>
              <option>Dispatched</option>
            </select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-sm">
                  <input 
                    type="checkbox" 
                    className="rounded border-border"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedOrders(mockOrders.map(o => o.id))
                      } else {
                        setSelectedOrders([])
                      }
                    }}
                  />
                </th>
                <th className="text-left py-3 px-4 font-medium text-sm">Order</th>
                <th className="text-left py-3 px-4 font-medium text-sm">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                <th className="text-left py-3 px-4 font-medium text-sm">Total</th>
                <th className="text-left py-3 px-4 font-medium text-sm">Items</th>
                <th className="text-left py-3 px-4 font-medium text-sm">Destination</th>
                <th className="text-left py-3 px-4 font-medium text-sm">Date</th>
                <th className="text-left py-3 px-4 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order) => (
                <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-3 px-4">
                    <input 
                      type="checkbox" 
                      className="rounded border-border"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => toggleOrderSelection(order.id)}
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium">{order.id}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm">{order.customerEmail}</div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                      {order.status.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium">{formatCurrency(order.total)}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm">{order.items} items</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm">
                      {order.shippingAddress.city}, {order.shippingAddress.state}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-muted-foreground">
                      {formatDateTime(order.createdAt)}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Truck className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedOrders.length > 0 && (
          <div className="mt-4 p-4 bg-primary/10 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedOrders.length} orders selected
              </span>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  Bulk Print Labels
                </Button>
                <Button size="sm" variant="outline">
                  Update Status
                </Button>
                <Button size="sm" variant="outline">
                  Add Tags
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}