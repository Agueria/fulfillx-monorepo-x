import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { OrdersService } from './orders.service'
import { CreateOrderDto, UpdateOrderDto, FulfillOrderDto } from './dto/orders.dto'

@ApiTags('orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'Orders retrieved successfully' })
  getOrders(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('status') status?: string,
    @Query('search') search?: string,
  ) {
    return this.ordersService.getOrders({ page, limit, status, search })
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiResponse({ status: 200, description: 'Order retrieved successfully' })
  getOrder(@Param('id') id: string) {
    return this.ordersService.getOrder(id)
  }

  @Post()
  @ApiOperation({ summary: 'Create new order' })
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update order' })
  @ApiResponse({ status: 200, description: 'Order updated successfully' })
  updateOrder(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.updateOrder(id, updateOrderDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete order' })
  @ApiResponse({ status: 200, description: 'Order deleted successfully' })
  deleteOrder(@Param('id') id: string) {
    return this.ordersService.deleteOrder(id)
  }

  @Post(':id/fulfill')
  @ApiOperation({ summary: 'Fulfill order' })
  @ApiResponse({ status: 200, description: 'Order fulfilled successfully' })
  fulfillOrder(@Param('id') id: string, @Body() fulfillOrderDto: FulfillOrderDto) {
    return this.ordersService.fulfillOrder(id, fulfillOrderDto)
  }

  @Post(':id/cancel')
  @ApiOperation({ summary: 'Cancel order' })
  @ApiResponse({ status: 200, description: 'Order cancelled successfully' })
  cancelOrder(@Param('id') id: string, @Body() body: { reason?: string }) {
    return this.ordersService.cancelOrder(id, body.reason)
  }

  @Get(':id/tracking')
  @ApiOperation({ summary: 'Get order tracking information' })
  @ApiResponse({ status: 200, description: 'Tracking information retrieved successfully' })
  getOrderTracking(@Param('id') id: string) {
    return this.ordersService.getOrderTracking(id)
  }
}