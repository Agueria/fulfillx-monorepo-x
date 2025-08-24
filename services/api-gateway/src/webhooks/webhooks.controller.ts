import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Headers } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { WebhooksService } from './webhooks.service'
import { CreateWebhookDto, UpdateWebhookDto } from './dto/webhooks.dto'

@ApiTags('webhooks')
@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all webhooks' })
  @ApiResponse({ status: 200, description: 'Webhooks retrieved successfully' })
  getWebhooks(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.webhooksService.getWebhooks({ page, limit })
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get webhook by ID' })
  @ApiResponse({ status: 200, description: 'Webhook retrieved successfully' })
  getWebhook(@Param('id') id: string) {
    return this.webhooksService.getWebhook(id)
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create new webhook' })
  @ApiResponse({ status: 201, description: 'Webhook created successfully' })
  createWebhook(@Body() createWebhookDto: CreateWebhookDto) {
    return this.webhooksService.createWebhook(createWebhookDto)
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update webhook' })
  @ApiResponse({ status: 200, description: 'Webhook updated successfully' })
  updateWebhook(@Param('id') id: string, @Body() updateWebhookDto: UpdateWebhookDto) {
    return this.webhooksService.updateWebhook(id, updateWebhookDto)
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete webhook' })
  @ApiResponse({ status: 200, description: 'Webhook deleted successfully' })
  deleteWebhook(@Param('id') id: string) {
    return this.webhooksService.deleteWebhook(id)
  }

  @Post(':id/test')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Test webhook' })
  @ApiResponse({ status: 200, description: 'Webhook test completed successfully' })
  testWebhook(@Param('id') id: string) {
    return this.webhooksService.testWebhook(id)
  }

  @Get(':id/deliveries')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get webhook delivery history' })
  @ApiResponse({ status: 200, description: 'Webhook deliveries retrieved successfully' })
  getWebhookDeliveries(
    @Param('id') id: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.webhooksService.getWebhookDeliveries(id, { page, limit })
  }

  // Incoming webhook endpoints for different platforms
  @Post('shopify')
  @ApiOperation({ summary: 'Shopify webhook endpoint' })
  @ApiResponse({ status: 200, description: 'Shopify webhook processed successfully' })
  handleShopifyWebhook(
    @Body() payload: any,
    @Headers('x-shopify-topic') topic: string,
    @Headers('x-shopify-hmac-sha256') signature: string,
  ) {
    return this.webhooksService.handleShopifyWebhook(payload, topic, signature)
  }

  @Post('amazon')
  @ApiOperation({ summary: 'Amazon webhook endpoint' })
  @ApiResponse({ status: 200, description: 'Amazon webhook processed successfully' })
  handleAmazonWebhook(@Body() payload: any) {
    return this.webhooksService.handleAmazonWebhook(payload)
  }

  @Post('ebay')
  @ApiOperation({ summary: 'eBay webhook endpoint' })
  @ApiResponse({ status: 200, description: 'eBay webhook processed successfully' })
  handleEbayWebhook(@Body() payload: any) {
    return this.webhooksService.handleEbayWebhook(payload)
  }
}