import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { ShippingService } from './shipping.service'
import { GetRatesDto, PurchaseLabelDto, VoidLabelDto } from './dto/shipping.dto'

@ApiTags('shipping')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Post('rates')
  @ApiOperation({ summary: 'Get shipping rates' })
  @ApiResponse({ status: 200, description: 'Shipping rates retrieved successfully' })
  getRates(@Body() getRatesDto: GetRatesDto) {
    return this.shippingService.getRates(getRatesDto)
  }

  @Post('labels')
  @ApiOperation({ summary: 'Purchase shipping label' })
  @ApiResponse({ status: 201, description: 'Shipping label purchased successfully' })
  purchaseLabel(@Body() purchaseLabelDto: PurchaseLabelDto) {
    return this.shippingService.purchaseLabel(purchaseLabelDto)
  }

  @Delete('labels/:id')
  @ApiOperation({ summary: 'Void shipping label' })
  @ApiResponse({ status: 200, description: 'Shipping label voided successfully' })
  voidLabel(@Param('id') id: string, @Body() voidLabelDto: VoidLabelDto) {
    return this.shippingService.voidLabel(id, voidLabelDto)
  }

  @Get('tracking/:trackingNumber')
  @ApiOperation({ summary: 'Track shipment' })
  @ApiResponse({ status: 200, description: 'Tracking information retrieved successfully' })
  trackShipment(@Param('trackingNumber') trackingNumber: string) {
    return this.shippingService.trackShipment(trackingNumber)
  }
}