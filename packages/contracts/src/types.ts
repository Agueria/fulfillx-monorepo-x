// Re-export all types for convenience
export * from './schemas/auth'
export * from './schemas/orders'
export * from './schemas/inventory'
export * from './schemas/shipping'
export * from './schemas/analytics'
export * from './schemas/rules'
export * from './schemas/common'

// API Response wrapper types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ApiError {
  success: false
  error: string
  code?: string
  details?: any
}

// Common query parameters
export interface ListParams {
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
  search?: string
  filters?: Record<string, any>
}

// Webhook event types
export interface WebhookEvent {
  id: string
  type: string
  data: any
  timestamp: Date
  organizationId: string
}

// Integration types
export interface MarketplaceConfig {
  platform: string
  credentials: Record<string, string>
  settings: Record<string, any>
  isActive: boolean
}

export interface CarrierConfig {
  carrier: string
  credentials: Record<string, string>
  settings: Record<string, any>
  isActive: boolean
}

// Queue job types
export interface QueueJob<T = any> {
  id: string
  type: string
  data: T
  attempts: number
  maxAttempts: number
  delay?: number
  priority?: number
  createdAt: Date
  processedAt?: Date
  completedAt?: Date
  failedAt?: Date
  error?: string
}

// Audit log types
export interface AuditLog {
  id: string
  organizationId: string
  userId: string
  action: string
  resource: string
  resourceId: string
  changes?: Record<string, any>
  metadata?: Record<string, any>
  ipAddress?: string
  userAgent?: string
  createdAt: Date
}

// Notification types
export interface NotificationTemplate {
  id: string
  name: string
  type: 'email' | 'sms' | 'webhook'
  subject?: string
  body: string
  variables: string[]
  isActive: boolean
}

export interface NotificationEvent {
  id: string
  templateId: string
  recipient: string
  data: Record<string, any>
  status: 'pending' | 'sent' | 'failed'
  sentAt?: Date
  error?: string
}

// Credit system types
export interface CreditBalance {
  organizationId: string
  balance: number
  currency: string
  lastUpdated: Date
}

export interface CreditTransaction {
  id: string
  organizationId: string
  type: 'earned' | 'spent' | 'bonus' | 'refund'
  amount: number
  currency: string
  description: string
  reference?: string
  createdAt: Date
}

// Picking and warehouse types
export interface PickingBatch {
  id: string
  warehouseId: string
  status: 'created' | 'picking' | 'completed' | 'cancelled'
  orders: string[]
  assignedTo?: string
  createdAt: Date
  startedAt?: Date
  completedAt?: Date
}

export interface PickingTask {
  id: string
  batchId: string
  orderId: string
  skuId: string
  quantity: number
  binLocation?: string
  status: 'pending' | 'picked' | 'skipped'
  pickedQuantity?: number
  pickedAt?: Date
}

// Rate limiting types
export interface RateLimit {
  windowMs: number
  max: number
  message?: string
  standardHeaders?: boolean
  legacyHeaders?: boolean
}

// Health check types
export interface HealthCheck {
  status: 'healthy' | 'unhealthy' | 'degraded'
  timestamp: Date
  uptime: number
  version: string
  dependencies: {
    database: 'healthy' | 'unhealthy'
    redis: 'healthy' | 'unhealthy'
    storage: 'healthy' | 'unhealthy'
  }
}

// Metrics types
export interface Metrics {
  requests: {
    total: number
    success: number
    errors: number
    averageResponseTime: number
  }
  orders: {
    total: number
    processed: number
    pending: number
  }
  inventory: {
    totalSkus: number
    lowStock: number
    outOfStock: number
  }
  shipping: {
    labelsCreated: number
    totalCost: number
    averageCost: number
  }
}