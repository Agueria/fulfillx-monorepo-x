import { z } from 'zod'
import { MoneySchema } from './common'

export const ProfitMetricsSchema = z.object({
  revenue: MoneySchema,
  cogs: MoneySchema,
  shippingCost: MoneySchema,
  fees: MoneySchema,
  adSpend: MoneySchema,
  grossProfit: MoneySchema,
  netProfit: MoneySchema,
  margin: z.number(), // percentage
})

export const SKUProfitSchema = z.object({
  skuId: z.string(),
  sku: z.string(),
  name: z.string(),
  period: z.object({
    start: z.date(),
    end: z.date(),
  }),
  metrics: ProfitMetricsSchema,
  unitsSold: z.number(),
  averageSellingPrice: MoneySchema,
  averageCost: MoneySchema,
})

export const ChannelProfitSchema = z.object({
  channelId: z.string(),
  channelName: z.string(),
  platform: z.string(),
  period: z.object({
    start: z.date(),
    end: z.date(),
  }),
  metrics: ProfitMetricsSchema,
  orderCount: z.number(),
  averageOrderValue: MoneySchema,
})

export const ProfitAnalysisRequestSchema = z.object({
  dateRange: z.object({
    start: z.date(),
    end: z.date(),
  }),
  groupBy: z.enum(['sku', 'channel', 'day', 'week', 'month']),
  filters: z.object({
    skuIds: z.array(z.string()).optional(),
    channelIds: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
  }).optional(),
})

export const ForecastConfigSchema = z.object({
  id: z.string(),
  orgId: z.string(),
  skuId: z.string(),
  method: z.enum(['moving_average', 'exponential_smoothing', 'linear_regression']),
  parameters: z.record(z.any()),
  isActive: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const DemandForecastSchema = z.object({
  skuId: z.string(),
  warehouseId: z.string(),
  forecastPeriod: z.object({
    start: z.date(),
    end: z.date(),
  }),
  predictedDemand: z.number(),
  confidence: z.number(), // 0-1
  reorderPoint: z.number(),
  safetyStock: z.number(),
  recommendedPurchaseQuantity: z.number(),
  leadTime: z.number(), // days
  holdingCost: MoneySchema,
})

export const InventoryValuationSchema = z.object({
  warehouseId: z.string(),
  warehouseName: z.string(),
  asOfDate: z.date(),
  totalValue: MoneySchema,
  totalUnits: z.number(),
  categories: z.array(z.object({
    category: z.string(),
    value: MoneySchema,
    units: z.number(),
    percentage: z.number(),
  })),
})

export const SalesVelocitySchema = z.object({
  skuId: z.string(),
  sku: z.string(),
  name: z.string(),
  period: z.object({
    start: z.date(),
    end: z.date(),
  }),
  unitsSold: z.number(),
  averageDailyVelocity: z.number(),
  trend: z.enum(['increasing', 'decreasing', 'stable']),
  seasonality: z.object({
    hasSeasonality: z.boolean(),
    peakMonths: z.array(z.number()).optional(),
    lowMonths: z.array(z.number()).optional(),
  }),
})

export const ExportRequestSchema = z.object({
  type: z.enum(['profit', 'inventory', 'sales', 'forecast']),
  format: z.enum(['csv', 'xlsx', 'json']),
  dateRange: z.object({
    start: z.date(),
    end: z.date(),
  }),
  filters: z.record(z.any()).optional(),
})

export type ProfitMetrics = z.infer<typeof ProfitMetricsSchema>
export type SKUProfit = z.infer<typeof SKUProfitSchema>
export type ChannelProfit = z.infer<typeof ChannelProfitSchema>
export type ProfitAnalysisRequest = z.infer<typeof ProfitAnalysisRequestSchema>
export type ForecastConfig = z.infer<typeof ForecastConfigSchema>
export type DemandForecast = z.infer<typeof DemandForecastSchema>
export type InventoryValuation = z.infer<typeof InventoryValuationSchema>
export type SalesVelocity = z.infer<typeof SalesVelocitySchema>
export type ExportRequest = z.infer<typeof ExportRequestSchema>