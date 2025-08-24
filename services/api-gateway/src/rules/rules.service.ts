import { Injectable } from '@nestjs/common'

@Injectable()
export class RulesService {
  getRules(params: any) {
    // Mock rules data - replace with actual database queries
    const mockRules = [
      {
        id: '1',
        name: 'Express Shipping for High Value Orders',
        description: 'Automatically select express shipping for orders over $100',
        isActive: true,
        priority: 1,
        conditions: {
          all: [
            { field: 'order.total', operator: 'gt', value: 100 },
          ],
        },
        actions: [
          { type: 'select_service', value: 'express' },
          { type: 'add_insurance', value: true },
        ],
        executionCount: 45,
        lastExecuted: new Date(Date.now() - 2 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
      {
        id: '2',
        name: 'West Coast Fulfillment',
        description: 'Route west coast orders to west coast warehouse',
        isActive: true,
        priority: 2,
        conditions: {
          any: [
            { field: 'shipping_address.state', operator: 'in', value: ['CA', 'OR', 'WA', 'NV', 'AZ'] },
          ],
        },
        actions: [
          { type: 'assign_warehouse', value: 'warehouse_2' },
        ],
        executionCount: 123,
        lastExecuted: new Date(Date.now() - 30 * 60 * 1000),
        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
      },
    ]

    return {
      success: true,
      data: {
        rules: mockRules,
        total: mockRules.length,
        page: params.page || 1,
        limit: params.limit || 10,
      },
    }
  }

  getRule(id: string) {
    // Mock single rule - replace with actual database query
    const mockRule = {
      id,
      name: 'Express Shipping for High Value Orders',
      description: 'Automatically select express shipping for orders over $100',
      isActive: true,
      priority: 1,
      conditions: {
        all: [
          { field: 'order.total', operator: 'gt', value: 100 },
        ],
      },
      actions: [
        { type: 'select_service', value: 'express' },
        { type: 'add_insurance', value: true },
      ],
      executionCount: 45,
      lastExecuted: new Date(Date.now() - 2 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    }

    return {
      success: true,
      data: mockRule,
    }
  }

  createRule(createRuleDto: any) {
    // Mock rule creation - replace with actual database insert
    const newRule = {
      id: `rule_${Date.now()}`,
      ...createRuleDto,
      executionCount: 0,
      lastExecuted: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    return {
      success: true,
      data: newRule,
    }
  }

  updateRule(id: string, updateRuleDto: any) {
    // Mock rule update - replace with actual database update
    return {
      success: true,
      data: {
        id,
        ...updateRuleDto,
        updatedAt: new Date(),
      },
    }
  }

  deleteRule(id: string) {
    // Mock rule deletion - replace with actual database delete
    return {
      success: true,
      message: 'Rule deleted successfully',
    }
  }

  toggleRule(id: string) {
    // Mock rule toggle - replace with actual database update
    return {
      success: true,
      data: {
        id,
        isActive: true, // This would be toggled based on current state
        updatedAt: new Date(),
      },
    }
  }

  testRule(rule: any, sampleOrder: any) {
    // Mock rule testing - replace with actual rule engine
    const result = this.evaluateRule(rule, sampleOrder)
    
    return {
      success: true,
      data: {
        matched: result.matched,
        actions: result.matched ? rule.actions : [],
        explanation: result.explanation,
      },
    }
  }

  getRuleExecutions(id: string, params: any) {
    // Mock rule executions - replace with actual database queries
    const mockExecutions = [
      {
        id: 'exec_1',
        ruleId: id,
        orderId: 'order_123',
        matched: true,
        actionsExecuted: ['select_service', 'add_insurance'],
        executionTime: 45, // milliseconds
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        id: 'exec_2',
        ruleId: id,
        orderId: 'order_124',
        matched: false,
        actionsExecuted: [],
        executionTime: 12,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      },
    ]

    return {
      success: true,
      data: {
        executions: mockExecutions,
        total: mockExecutions.length,
        page: params.page || 1,
        limit: params.limit || 10,
      },
    }
  }

  private evaluateRule(rule: any, order: any) {
    // Simple rule evaluation logic - replace with more sophisticated rule engine
    const conditions = rule.conditions
    
    if (conditions.all) {
      const allMatch = conditions.all.every((condition: any) => 
        this.evaluateCondition(condition, order)
      )
      return {
        matched: allMatch,
        explanation: allMatch ? 'All conditions matched' : 'Not all conditions matched',
      }
    }
    
    if (conditions.any) {
      const anyMatch = conditions.any.some((condition: any) => 
        this.evaluateCondition(condition, order)
      )
      return {
        matched: anyMatch,
        explanation: anyMatch ? 'At least one condition matched' : 'No conditions matched',
      }
    }
    
    return { matched: false, explanation: 'No valid conditions found' }
  }

  private evaluateCondition(condition: any, order: any) {
    const fieldValue = this.getFieldValue(condition.field, order)
    
    switch (condition.operator) {
      case 'gt':
        return fieldValue > condition.value
      case 'lt':
        return fieldValue < condition.value
      case 'eq':
        return fieldValue === condition.value
      case 'in':
        return Array.isArray(condition.value) && condition.value.includes(fieldValue)
      case 'contains':
        return String(fieldValue).toLowerCase().includes(String(condition.value).toLowerCase())
      default:
        return false
    }
  }

  private getFieldValue(fieldPath: string, object: any) {
    return fieldPath.split('.').reduce((obj, key) => obj?.[key], object)
  }
}