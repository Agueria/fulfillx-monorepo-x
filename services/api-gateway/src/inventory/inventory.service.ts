import { Injectable } from '@nestjs/common'

// Mock data stores
const skus = new Map()
const inventoryLevels = new Map()
const reservations = new Map()

@Injectable()
export class InventoryService {
  getSkus(query: any) {
    return this.findAllSkus(query)
  }

  getSku(id: string) {
    return this.findOneSku(id)
  }

  deleteSku(id: string) {
    const sku = skus.get(id)
    if (!sku) {
      return { success: false, error: 'SKU not found' }
    }
    
    skus.delete(id)
    return { success: true, message: 'SKU deleted successfully' }
  }

  getInventoryMovements(query: any) {
    // Mock inventory movements data
    const movements = [
      {
        id: 'movement_1',
        skuId: 'sku_1',
        warehouseId: 'warehouse_1',
        type: 'INBOUND',
        quantity: 100,
        reason: 'Purchase Order',
        createdAt: new Date(),
      },
      {
        id: 'movement_2',
        skuId: 'sku_1',
        warehouseId: 'warehouse_1',
        type: 'OUTBOUND',
        quantity: -5,
        reason: 'Sale',
        createdAt: new Date(),
      }
    ]

    return {
      success: true,
      data: movements,
      pagination: {
        page: 1,
        limit: 20,
        total: movements.length,
        totalPages: 1
      }
    }
  }

  findAllSkus(query: any) {
    const skuList = Array.from(skus.values())
    
    // Apply filters
    let filtered = skuList
    if (query.search) {
      filtered = filtered.filter(sku => 
        sku.sku?.includes(query.search) ||
        sku.name?.includes(query.search)
      )
    }

    // Apply pagination
    const page = parseInt(query.page) || 1
    const limit = parseInt(query.limit) || 20
    const start = (page - 1) * limit
    const end = start + limit
    
    const paginatedSkus = filtered.slice(start, end)
    
    return {
      success: true,
      data: paginatedSkus,
      pagination: {
        page,
        limit,
        total: filtered.length,
        totalPages: Math.ceil(filtered.length / limit)
      }
    }
  }

  findOneSku(id: string) {
    const sku = skus.get(id)
    if (!sku) {
      return { success: false, error: 'SKU not found' }
    }
    return { success: true, data: sku }
  }

  createSku(createSkuDto: any) {
    const id = `sku_${Date.now()}`
    const sku = {
      id,
      ...createSkuDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    skus.set(id, sku)
    return { success: true, data: sku }
  }

  updateSku(id: string, updateSkuDto: any) {
    const sku = skus.get(id)
    if (!sku) {
      return { success: false, error: 'SKU not found' }
    }
    
    const updatedSku = {
      ...sku,
      ...updateSkuDto,
      updatedAt: new Date(),
    }
    skus.set(id, updatedSku)
    
    return { success: true, data: updatedSku }
  }

  getInventoryLevels(query: any) {
    const levels = Array.from(inventoryLevels.values())
    
    // Filter by warehouse if specified
    let filtered = levels
    if (query.warehouseId) {
      filtered = filtered.filter(level => level.warehouseId === query.warehouseId)
    }

    return {
      success: true,
      data: filtered
    }
  }

  adjustInventory(adjustmentDto: any) {
    const { skuId, warehouseId, quantity, type, reason } = adjustmentDto
    const levelKey = `${skuId}_${warehouseId}`
    
    let level = inventoryLevels.get(levelKey)
    if (!level) {
      level = {
        id: `level_${Date.now()}`,
        skuId,
        warehouseId,
        available: 0,
        reserved: 0,
        total: 0,
        updatedAt: new Date(),
      }
    }

    // Apply adjustment based on type
    switch (type) {
      case 'INBOUND':
        level.available += quantity
        level.total += quantity
        break
      case 'OUTBOUND':
        level.available -= quantity
        level.total -= quantity
        break
      case 'ADJUSTMENT':
        const diff = quantity - level.total
        level.available += diff
        level.total = quantity
        break
    }

    level.updatedAt = new Date()
    inventoryLevels.set(levelKey, level)

    // Create ledger entry
    const ledgerEntry = {
      id: `ledger_${Date.now()}`,
      skuId,
      warehouseId,
      type,
      quantity,
      reason,
      createdAt: new Date(),
    }

    return {
      success: true,
      data: {
        level,
        ledgerEntry
      }
    }
  }

  createReservation(reservationDto: any) {
    const { skuId, quantity, reference, expiresAt } = reservationDto
    const id = `reservation_${Date.now()}`
    
    const reservation = {
      id,
      skuId,
      quantity,
      reference,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      createdAt: new Date(),
    }
    
    reservations.set(id, reservation)
    
    // Update inventory levels to reflect reservation
    // This would typically be done in a transaction
    
    return { success: true, data: reservation }
  }

  releaseReservation(id: string) {
    const reservation = reservations.get(id)
    if (!reservation) {
      return { success: false, error: 'Reservation not found' }
    }
    
    reservations.delete(id)
    
    // Update inventory levels to release reservation
    // This would typically be done in a transaction
    
    return { 
      success: true, 
      message: 'Reservation released successfully',
      data: { id, releasedAt: new Date() }
    }
  }
}