import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { AnalyticsService } from './analytics.service'

@ApiTags('analytics')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get dashboard analytics' })
  @ApiResponse({ status: 200, description: 'Dashboard analytics retrieved successfully' })
  getDashboardAnalytics() {
    return this.analyticsService.getDashboardAnalytics()
  }

  @Get('orders')
  @ApiOperation({ summary: 'Get order analytics' })
  @ApiResponse({ status: 200, description: 'Order analytics retrieved successfully' })
  getOrderAnalytics(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('groupBy') groupBy?: string,
  ) {
    return this.analyticsService.getOrderAnalytics({
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      groupBy,
    })
  }

  @Get('inventory')
  @ApiOperation({ summary: 'Get inventory analytics' })
  @ApiResponse({ status: 200, description: 'Inventory analytics retrieved successfully' })
  getInventoryAnalytics() {
    return this.analyticsService.getInventoryAnalytics()
  }

  @Get('shipping')
  @ApiOperation({ summary: 'Get shipping analytics' })
  @ApiResponse({ status: 200, description: 'Shipping analytics retrieved successfully' })
  getShippingAnalytics(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.analyticsService.getShippingAnalytics({
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    })
  }

  @Get('performance')
  @ApiOperation({ summary: 'Get performance metrics' })
  @ApiResponse({ status: 200, description: 'Performance metrics retrieved successfully' })
  getPerformanceMetrics() {
    return this.analyticsService.getPerformanceMetrics()
  }
}