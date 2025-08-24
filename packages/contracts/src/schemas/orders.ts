import { z } from 'zod'
import { AddressSchema, MoneySchema, WeightSchema } from './common'

export const OrderStatusSchema = z.enum([
  'NEW',
  'READY_TO_SHIP',
  'LABEL_PURCHASED',
  'DISPATCHED',
  'DELIVERED',
  'CLOSED',
  'RETURN_REQUESTED',
  'RETURNED',
  'CANCELLED'
])

export const OrderItemSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  skuId: z.string(),
  sku: z.string(),
  name: z.string(),
  quantity: z.number().min(1),
  unitPrice: MoneySchema,
  totalPrice: MoneySchema,
  weight: WeightSchema.optional(),
  imageUrl: z.string().url().optional(),
  attributes: z.record(z.string()).optional(),
})

export const OrderSchema = z.object({
  id: z.string(),
  orgId: z.string(),
  storeId: z.string(),
  channelOrderId: z.string(),
  status: OrderStatusSchema,
  orderNumber: z.string(),
  customerEmail: z.string().email(),
  customerPhone: z.string().optional(),
  shippingAddress: AddressSchema,
  billingAddress: AddressSchema.optional(),
  items: z.array(OrderItemSchema),
  subtotal: MoneySchema,
  shippingCost: MoneySchema,
  tax: MoneySchema,
  total: MoneySchema,
  tags: z.array(z.string()).default([]),
  notes: z.array(z.object({
    id: z.string(),
    content: z.string(),
    authorId: z.string(),
    authorName: z.string(),
    createdAt: z.date(),
    mentions: z.array(z.string()).default([]),
  })).default([]),
  deliveryPromise: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const CreateOrderSchema = OrderSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  notes: true,
})

export const UpdateOrderSchema = OrderSchema.partial().omit({
  id: true,
  orgId: true,
  createdAt: true,
})

export const OrderFiltersSchema = z.object({
  status: z.array(OrderStatusSchema).optional(),
  storeId: z.string().optional(),
  tags: z.array(z.string()).optional(),
  dateFrom: z.date().optional(),
  dateTo: z.date().optional(),
  search: z.string().optional(),
})

export const DuplicateOrderSchema = z.object({
  orderId: z.string(),
  quantity: z.number().min(1).default(1),
})

export const AddOrderNoteSchema = z.object({
  orderId: z.string(),
  content: z.string().min(1),
  mentions: z.array(z.string()).default([]),
})

export type OrderStatus = z.infer<typeof OrderStatusSchema>
export type OrderItem = z.infer<typeof OrderItemSchema>
export type Order = z.infer<typeof OrderSchema>
export type CreateOrder = z.infer<typeof CreateOrderSchema>
export type UpdateOrder = z.infer<typeof UpdateOrderSchema>
export type OrderFilters = z.infer<typeof OrderFiltersSchema>
export type DuplicateOrder = z.infer<typeof DuplicateOrderSchema>
export type AddOrderNote = z.infer<typeof AddOrderNoteSchema>