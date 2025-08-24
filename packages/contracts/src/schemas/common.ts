import { z } from 'zod'

export const PaginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  total: z.number().optional(),
  totalPages: z.number().optional(),
})

export const SortSchema = z.object({
  field: z.string(),
  direction: z.enum(['asc', 'desc']).default('asc'),
})

export const FilterSchema = z.object({
  field: z.string(),
  operator: z.enum(['eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'in', 'nin', 'contains']),
  value: z.any(),
})

export const AddressSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  company: z.string().optional(),
  line1: z.string(),
  line2: z.string().optional(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  country: z.string(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
})

export const MoneySchema = z.object({
  amount: z.number(),
  currency: z.string().length(3).default('USD'),
})

export const WeightSchema = z.object({
  value: z.number(),
  unit: z.enum(['oz', 'lb', 'g', 'kg']).default('oz'),
})

export const DimensionsSchema = z.object({
  length: z.number(),
  width: z.number(),
  height: z.number(),
  unit: z.enum(['in', 'cm']).default('in'),
})

export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    error: z.string().optional(),
    pagination: PaginationSchema.optional(),
  })

export const ErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.string(),
  code: z.string().optional(),
  details: z.any().optional(),
})

export type Pagination = z.infer<typeof PaginationSchema>
export type Sort = z.infer<typeof SortSchema>
export type Filter = z.infer<typeof FilterSchema>
export type Address = z.infer<typeof AddressSchema>
export type Money = z.infer<typeof MoneySchema>
export type Weight = z.infer<typeof WeightSchema>
export type Dimensions = z.infer<typeof DimensionsSchema>
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>