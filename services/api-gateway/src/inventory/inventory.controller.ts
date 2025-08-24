import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { InventoryService } from './inventory.service'
import { CreateSkuDto, UpdateSkuDto, AdjustInventoryDto } from './dto/inventory.dto'

@ApiTags('inventory')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('skus')
  @ApiOperation({ summary: 'Get all SKUs' })
  @ApiResponse({ status: 200, description: 'SKUs retrieved successfully' })
  getSkus(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    return this.inventoryService.getSkus({ page, limit, search })
  }

  @Get('skus/:id')
  @ApiOperation({ summary: 'Get SKU by ID' })
  @ApiResponse({ status: 200, description: 'SKU retrieved successfully' })
  getSku(@Param('id') id: string) {
    return this.inventoryService.getSku(id)
  }

  @Post('skus')
  @ApiOperation({ summary: 'Create new SKU' })
  @ApiResponse({ status: 201, description: 'SKU created successfully' })
  createSku(@Body() createSkuDto: CreateSkuDto) {
    return this.inventoryService.createSku(createSkuDto)
  }

  @Put('skus/:id')
  @ApiOperation({ summary: 'Update SKU' })
  @ApiResponse({ status: 200, description: 'SKU updated successfully' })
  updateSku(@Param('id') id: string, @Body() updateSkuDto: UpdateSkuDto) {
    return this.inventoryService.updateSku(id, updateSkuDto)
  }

  @Delete('skus/:id')
  @ApiOperation({ summary: 'Delete SKU' })
  @ApiResponse({ status: 200, description: 'SKU deleted successfully' })
  deleteSku(@Param('id') id: string) {
    return this.inventoryService.deleteSku(id)
  }

  @Get('levels')
  @ApiOperation({ summary: 'Get inventory levels' })
  @ApiResponse({ status: 200, description: 'Inventory levels retrieved successfully' })
  getInventoryLevels(
    @Query('warehouseId') warehouseId?: string,
    @Query('skuId') skuId?: string,
  ) {
    return this.inventoryService.getInventoryLevels({ warehouseId, skuId })
  }

  @Post('adjustments')
  @ApiOperation({ summary: 'Adjust inventory levels' })
  @ApiResponse({ status: 201, description: 'Inventory adjusted successfully' })
  adjustInventory(@Body() adjustInventoryDto: AdjustInventoryDto) {
    return this.inventoryService.adjustInventory(adjustInventoryDto)
  }

  @Get('movements')
  @ApiOperation({ summary: 'Get inventory movements' })
  @ApiResponse({ status: 200, description: 'Inventory movements retrieved successfully' })
  getInventoryMovements(
    @Query('skuId') skuId?: string,
    @Query('warehouseId') warehouseId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.inventoryService.getInventoryMovements({
      skuId,
      warehouseId,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    })
  }
}