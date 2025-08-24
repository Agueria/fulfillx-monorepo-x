import { z } from 'zod'

export const ConditionOperatorSchema = z.enum([
  'eq', 'ne', 'gt', 'gte', 'lt', 'lte', 
  'in', 'nin', 'contains', 'starts_with', 'ends_with'
])

export const ConditionSchema = z.object({
  field: z.string(),
  operator: ConditionOperatorSchema,
  value: z.any(),
})

// Define the type first
export type ConditionGroup = {
  all?: (Condition | ConditionGroup)[]
  any?: (Condition | ConditionGroup)[]
}

export const ConditionGroupSchema: z.ZodType<ConditionGroup> = z.object({
  all: z.array(z.lazy(() => ConditionSchema.or(ConditionGroupSchema))).optional(),
  any: z.array(z.lazy(() => ConditionSchema.or(ConditionGroupSchema))).optional(),
})

export const ActionTypeSchema = z.enum([
  'select_carrier',
  'select_service',
  'assign_warehouse',
  'add_insurance',
  'require_signature',
  'split_shipment',
  'add_tag',
  'set_priority',
  'send_notification',
  'set_stock_buffer',
  'create_purchase_order'
])

export const ActionSchema = z.object({
  type: ActionTypeSchema,
  value: z.any(),
  parameters: z.record(z.any()).optional(),
})

export const AutomationRuleSchema = z.object({
  id: z.string(),
  orgId: z.string(),
  name: z.string(),
  description: z.string().optional(),
  conditions: ConditionGroupSchema,
  actions: z.array(ActionSchema),
  isActive: z.boolean().default(true),
  priority: z.number().default(0),
  executionCount: z.number().default(0),
  lastExecuted: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const CreateAutomationRuleSchema = AutomationRuleSchema.omit({
  id: true,
  executionCount: true,
  lastExecuted: true,
  createdAt: true,
  updatedAt: true,
})

export const UpdateAutomationRuleSchema = AutomationRuleSchema.partial().omit({
  id: true,
  orgId: true,
  executionCount: true,
  lastExecuted: true,
  createdAt: true,
})

export const RuleExecutionContextSchema = z.object({
  order: z.any().optional(),
  inventory: z.any().optional(),
  shipment: z.any().optional(),
  customer: z.any().optional(),
  metadata: z.record(z.any()).optional(),
})

export const RuleExecutionResultSchema = z.object({
  ruleId: z.string(),
  matched: z.boolean(),
  actionsExecuted: z.array(z.object({
    action: ActionSchema,
    success: z.boolean(),
    result: z.any().optional(),
    error: z.string().optional(),
  })),
  executionTime: z.number(), // milliseconds
  timestamp: z.date(),
})

export const RuleTestRequestSchema = z.object({
  ruleId: z.string(),
  testData: RuleExecutionContextSchema,
  dryRun: z.boolean().default(true),
})

export const RuleAuditLogSchema = z.object({
  id: z.string(),
  ruleId: z.string(),
  orgId: z.string(),
  context: RuleExecutionContextSchema,
  result: RuleExecutionResultSchema,
  createdAt: z.date(),
})

// Predefined field schemas for rule builder UI
export const RuleFieldSchema = z.object({
  key: z.string(),
  label: z.string(),
  type: z.enum(['string', 'number', 'boolean', 'date', 'array', 'object']),
  operators: z.array(ConditionOperatorSchema),
  options: z.array(z.object({
    value: z.any(),
    label: z.string(),
  })).optional(),
})

export const RuleTemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.string(),
  conditions: ConditionGroupSchema,
  actions: z.array(ActionSchema),
  isPopular: z.boolean().default(false),
})

export type ConditionOperator = z.infer<typeof ConditionOperatorSchema>
export type Condition = z.infer<typeof ConditionSchema>
export type ActionType = z.infer<typeof ActionTypeSchema>
export type Action = z.infer<typeof ActionSchema>
export type AutomationRule = z.infer<typeof AutomationRuleSchema>
export type CreateAutomationRule = z.infer<typeof CreateAutomationRuleSchema>
export type UpdateAutomationRule = z.infer<typeof UpdateAutomationRuleSchema>
export type RuleExecutionContext = z.infer<typeof RuleExecutionContextSchema>
export type RuleExecutionResult = z.infer<typeof RuleExecutionResultSchema>
export type RuleTestRequest = z.infer<typeof RuleTestRequestSchema>
export type RuleAuditLog = z.infer<typeof RuleAuditLogSchema>
export type RuleField = z.infer<typeof RuleFieldSchema>
export type RuleTemplate = z.infer<typeof RuleTemplateSchema>