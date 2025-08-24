import { z } from 'zod'
import { AddressSchema, MoneySchema, WeightSchema, DimensionsSchema } from './common'

export const CarrierSchema = z.enum(['ups', 'usps', 'fedex', 'dhl'])

export const ServiceTypeSchema = z.enum([
  'ground',
  'express',
  'overnight',
  'two_day',
  'priority',
  'first_class'
])

export const PackageTypeSchema = z.enum([
  'package',
  'envelope',
  'tube',
  'pak',
  'box'
])

export const ParcelSchema = z.object({
  weight: WeightSchema,
  dimensions: DimensionsSchema,
  packageType: PackageTypeSchema.default('package'),
  value: MoneySchema.optional(),
  contents: z.string().optional(),
})

export const RateQuoteRequestSchema = z.object({
  fromAddress: AddressSchema,
  toAddress: AddressSchema,
  parcels: z.array(ParcelSchema),
  carriers: z.array(CarrierSchema).optional(),
  services: z.array(ServiceTypeSchema).optional(),
  deliveryDate: z.date().optional(),
})

export const RateQuoteSchema = z.object({
  id: z.string(),
  carrier: CarrierSchema,
  service: ServiceTypeSchema,
  serviceCode: z.string(),
  serviceName: z.string(),
  cost: MoneySchema,
  transitTime: z.number().optional(),
  deliveryDate: z.date().optional(),
  guaranteedDelivery: z.boolean().default(false),
  metadata: z.record(z.any()).optional(),
})

export const LabelPurchaseRequestSchema = z.object({
  rateId: z.string(),
  orderId: z.string().optional(),
  fromAddress: AddressSchema,
  toAddress: AddressSchema,
  parcels: z.array(ParcelSchema),
  insurance: z.object({
    amount: MoneySchema,
    provider: z.string().optional(),
  }).optional(),
  signature: z.boolean().default(false),
  idempotencyKey: z.string(),
})

export const LabelSchema = z.object({
  id: z.string(),
  trackingNumber: z.string(),
  carrier: CarrierSchema,
  service: ServiceTypeSchema,
  cost: MoneySchema,
  labelUrl: z.string().url(),
  trackingUrl: z.string().url().optional(),
  createdAt: z.date(),
  voidedAt: z.date().optional(),
})

export const ShipmentSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  trackingNumber: z.string(),
  carrier: CarrierSchema,
  service: ServiceTypeSchema,
  fromAddress: AddressSchema,
  toAddress: AddressSchema,
  parcels: z.array(ParcelSchema),
  labels: z.array(LabelSchema),
  cost: MoneySchema,
  status: z.enum(['created', 'in_transit', 'delivered', 'exception', 'returned']),
  createdAt: z.date(),
  shippedAt: z.date().optional(),
  deliveredAt: z.date().optional(),
})

export const TrackingEventSchema = z.object({
  id: z.string(),
  trackingNumber: z.string(),
  status: z.string(),
  description: z.string(),
  location: z.string().optional(),
  timestamp: z.date(),
  carrier: CarrierSchema,
})

export const VoidLabelRequestSchema = z.object({
  labelId: z.string(),
  reason: z.string().optional(),
})

export type Carrier = z.infer<typeof CarrierSchema>
export type ServiceType = z.infer<typeof ServiceTypeSchema>
export type PackageType = z.infer<typeof PackageTypeSchema>
export type Parcel = z.infer<typeof ParcelSchema>
export type RateQuoteRequest = z.infer<typeof RateQuoteRequestSchema>
export type RateQuote = z.infer<typeof RateQuoteSchema>
export type LabelPurchaseRequest = z.infer<typeof LabelPurchaseRequestSchema>
export type Label = z.infer<typeof LabelSchema>
export type Shipment = z.infer<typeof ShipmentSchema>
export type TrackingEvent = z.infer<typeof TrackingEventSchema>
export type VoidLabelRequest = z.infer<typeof VoidLabelRequestSchema>