import { z } from 'zod'
import { WeightSchema, DimensionsSchema } from './common'

export const SKUSchema = z.object({
  id: z.string(),
  orgId: z.string(),
  sku: z.string(),
  name: z.string(),
  description: z.string().optional(),
  weight: WeightSchema.optional(),
  dimensions: DimensionsSchema.optional(),
  imageUrl: z.string().url().optional(),
  attributes: z.record(z.string()).optional(),
  isBundle: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const CreateSKUSchema = SKUSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const UpdateSKUSchema = SKUSchema.partial().omit({
  id: true,
  orgId: true,
  createdAt: true,
})

export const WarehouseSchema = z.object({
  id: z.string(),
  orgId: z.string(),
  name: z.string(),
  address: z.object({
    name: z.string(),
    line1: z.string(),
    line2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string(),
  }),
  isDefault: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const InventoryLevelSchema = z.object({
  id: z.string(),
  skuId: z.string(),
  warehouseId: z.string(),
  available: z.number().min(0),
  reserved: z.number().min(0),
  total: z.number().min(0),
  updatedAt: z.date(),
})

export const StockMovementTypeSchema = z.enum([
  'INBOUND',
  'OUTBOUND',
  'ADJUSTMENT',
  'TRANSFER_IN',
  'TRANSFER_OUT',
  'RESERVATION',
  'RELEASE'
])

export const StockLedgerSchema = z.object({
  id: z.string(),
  skuId: z.string(),
  warehouseId: z.string(),
  type: StockMovementTypeSchema,
  quantity: z.number(),
  reference: z.string().optional(),
  reason: z.string().optional(),
  createdAt: z.date(),
})

export const StockAdjustmentSchema = z.object({
  skuId: z.string(),
  warehouseId: z.string(),
  quantity: z.number(),
  type: StockMovementTypeSchema,
  reason: z.string().optional(),
  reference: z.string().optional(),
})

export const ReservationSchema = z.object({
  id: z.string(),
  skuId: z.string(),
  quantity: z.number().min(1),
  reference: z.string(),
  expiresAt: z.date().optional(),
  createdAt: z.date(),
})

export const CreateReservationSchema = ReservationSchema.omit({
  id: true,
  createdAt: true,
})

export const BundleItemSchema = z.object({
  id: z.string(),
  bundleId: z.string(),
  childSkuId: z.string(),
  quantity: z.number().min(1),
})

export const CreateBundleSchema = z.object({
  bundleSkuId: z.string(),
  items: z.array(z.object({
    childSkuId: z.string(),
    quantity: z.number().min(1),
  })),
})

export const TransferStatusSchema = z.enum([
  'PENDING',
  'IN_TRANSIT',
  'COMPLETED',
  'CANCELLED'
])

export const TransferSchema = z.object({
  id: z.string(),
  fromWarehouseId: z.string(),
  toWarehouseId: z.string(),
  status: TransferStatusSchema,
  items: z.array(z.object({
    skuId: z.string(),
    quantity: z.number().min(1),
  })),
  createdAt: z.date(),
  completedAt: z.date().optional(),
})

export const CreateTransferSchema = TransferSchema.omit({
  id: true,
  createdAt: true,
  completedAt: true,
})

export type SKU = z.infer<typeof SKUSchema>
export type CreateSKU = z.infer<typeof CreateSKUSchema>
export type UpdateSKU = z.infer<typeof UpdateSKUSchema>
export type Warehouse = z.infer<typeof WarehouseSchema>
export type InventoryLevel = z.infer<typeof InventoryLevelSchema>
export type StockMovementType = z.infer<typeof StockMovementTypeSchema>
export type StockLedger = z.infer<typeof StockLedgerSchema>
export type StockAdjustment = z.infer<typeof StockAdjustmentSchema>
export type Reservation = z.infer<typeof ReservationSchema>
export type CreateReservation = z.infer<typeof CreateReservationSchema>
export type BundleItem = z.infer<typeof BundleItemSchema>
export type CreateBundle = z.infer<typeof CreateBundleSchema>
export type TransferStatus = z.infer<typeof TransferStatusSchema>
export type Transfer = z.infer<typeof TransferSchema>
export type CreateTransfer = z.infer<typeof CreateTransferSchema>