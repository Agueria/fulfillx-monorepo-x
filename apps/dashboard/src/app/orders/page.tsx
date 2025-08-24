import { OrdersTable } from '@/components/orders/orders-table'
import { OrdersHeader } from '@/components/orders/orders-header'

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <OrdersHeader />
      <OrdersTable />
    </div>
  )
}