import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create demo organization
  const org = await prisma.organization.create({
    data: {
      name: 'Demo Company',
      slug: 'demo-company',
      settings: {
        timezone: 'America/New_York',
        currency: 'USD',
        weightUnit: 'oz',
        dimensionUnit: 'in',
      },
    },
  })

  // Create demo user
  const hashedPassword = await bcrypt.hash('password123', 10)
  const user = await prisma.user.create({
    data: {
      email: 'demo@fulfillx.com',
      password: hashedPassword,
      name: 'Demo User',
    },
  })

  // Create organization membership
  await prisma.organizationMember.create({
    data: {
      userId: user.id,
      orgId: org.id,
      role: 'ADMIN',
    },
  })

  // Create demo stores
  const stores = await Promise.all([
    prisma.store.create({
      data: {
        orgId: org.id,
        name: 'Shopify Store',
        platform: 'shopify',
        settings: { apiKey: 'demo_key' },
      },
    }),
    prisma.store.create({
      data: {
        orgId: org.id,
        name: 'Amazon Store',
        platform: 'amazon',
        settings: { sellerId: 'demo_seller' },
      },
    }),
    prisma.store.create({
      data: {
        orgId: org.id,
        name: 'eBay Store',
        platform: 'ebay',
        settings: { storeId: 'demo_store' },
      },
    }),
  ])

  // Create warehouses
  const warehouses = await Promise.all([
    prisma.warehouse.create({
      data: {
        orgId: org.id,
        name: 'Main Warehouse',
        isDefault: true,
        address: {
          name: 'Main Warehouse',
          line1: '123 Warehouse St',
          city: 'New York',
          state: 'NY',
          postalCode: '10001',
          country: 'US',
        },
      },
    }),
    prisma.warehouse.create({
      data: {
        orgId: org.id,
        name: 'West Coast Warehouse',
        address: {
          name: 'West Coast Warehouse',
          line1: '456 Storage Ave',
          city: 'Los Angeles',
          state: 'CA',
          postalCode: '90001',
          country: 'US',
        },
      },
    }),
  ])

  // Create bin locations
  const binLocations: any[] = []
  for (const warehouse of warehouses) {
    for (let zone = 1; zone <= 3; zone++) {
      for (let aisle = 1; aisle <= 5; aisle++) {
        for (let shelf = 1; shelf <= 4; shelf++) {
          binLocations.push({
            warehouseId: warehouse.id,
            name: `Z${zone}-A${aisle}-S${shelf}`,
            zone: `Zone ${zone}`,
            aisle: `Aisle ${aisle}`,
            shelf: `Shelf ${shelf}`,
          })
        }
      }
    }
  }
  await prisma.binLocation.createMany({ data: binLocations })

  // Create demo SKUs
  const skuData = [
    { sku: 'TSHIRT-001', name: 'Classic T-Shirt - Black', weight: { value: 6, unit: 'oz' } },
    { sku: 'TSHIRT-002', name: 'Classic T-Shirt - White', weight: { value: 6, unit: 'oz' } },
    { sku: 'HOODIE-001', name: 'Premium Hoodie - Gray', weight: { value: 16, unit: 'oz' } },
    { sku: 'JEANS-001', name: 'Denim Jeans - Blue', weight: { value: 20, unit: 'oz' } },
    { sku: 'SHOES-001', name: 'Running Shoes - White', weight: { value: 24, unit: 'oz' } },
    { sku: 'HAT-001', name: 'Baseball Cap - Navy', weight: { value: 4, unit: 'oz' } },
    { sku: 'SOCKS-001', name: 'Cotton Socks - Pack of 3', weight: { value: 3, unit: 'oz' } },
    { sku: 'JACKET-001', name: 'Winter Jacket - Black', weight: { value: 32, unit: 'oz' } },
  ]

  const skus: any[] = []
  for (const item of skuData) {
    const sku = await prisma.sKU.create({
      data: {
        orgId: org.id,
        sku: item.sku,
        name: item.name,
        weight: item.weight,
        dimensions: { length: 12, width: 8, height: 2, unit: 'in' },
        attributes: { color: 'Various', material: 'Cotton' },
      },
    })
    skus.push(sku)

    // Create inventory levels for each warehouse
    for (const warehouse of warehouses) {
      const available = Math.floor(Math.random() * 100) + 10
      await prisma.inventoryLevel.create({
        data: {
          skuId: sku.id,
          warehouseId: warehouse.id,
          available,
          reserved: Math.floor(Math.random() * 10),
          total: available + Math.floor(Math.random() * 10),
        },
      })
    }
  }

  // Create demo orders
  const orderData: any[] = []
  for (let i = 1; i <= 50; i++) {
    const store = stores[Math.floor(Math.random() * stores.length)]
    const orderSkus = skus.slice(0, Math.floor(Math.random() * 3) + 1)
    
    const subtotal = orderSkus.reduce((sum, sku) => sum + (Math.random() * 50 + 10), 0)
    const shippingCost = Math.random() * 15 + 5
    const tax = subtotal * 0.08
    
    orderData.push({
      orgId: org.id,
      storeId: store.id,
      channelOrderId: `${store.platform.toUpperCase()}-${1000 + i}`,
      orderNumber: `ORD-${String(i).padStart(6, '0')}`,
      status: ['NEW', 'READY_TO_SHIP', 'LABEL_PURCHASED'][Math.floor(Math.random() * 3)] as any,
      customerEmail: `customer${i}@example.com`,
      shippingAddress: {
        name: `Customer ${i}`,
        line1: `${100 + i} Main St`,
        city: 'Anytown',
        state: 'NY',
        postalCode: '12345',
        country: 'US',
      },
      subtotal,
      shippingCost,
      tax,
      total: subtotal + shippingCost + tax,
      tags: Math.random() > 0.5 ? ['priority'] : [],
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    })
  }

  const orders = await Promise.all(
    orderData.map(data => prisma.order.create({ data }))
  )

  // Create order items
  for (const order of orders) {
    const numItems = Math.floor(Math.random() * 3) + 1
    const orderSkus = skus.slice(0, numItems)
    
    for (const sku of orderSkus) {
      const quantity = Math.floor(Math.random() * 3) + 1
      const unitPrice = Math.random() * 50 + 10
      
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          skuId: sku.id,
          sku: sku.sku,
          name: sku.name,
          quantity,
          unitPrice,
          totalPrice: unitPrice * quantity,
          weight: sku.weight,
        },
      })
    }
  }

  // Create automation rules
  await Promise.all([
    prisma.automationRule.create({
      data: {
        orgId: org.id,
        name: 'Express Shipping for High Value Orders',
        description: 'Automatically select express shipping for orders over $100',
        conditions: {
          all: [
            { field: 'order.total', operator: 'gt', value: 100 },
          ],
        },
        actions: [
          { type: 'select_service', value: 'express' },
          { type: 'add_insurance', value: true },
        ],
        priority: 1,
      },
    }),
    prisma.automationRule.create({
      data: {
        orgId: org.id,
        name: 'West Coast Fulfillment',
        description: 'Route west coast orders to west coast warehouse',
        conditions: {
          any: [
            { field: 'shipping_address.state', operator: 'in', value: ['CA', 'OR', 'WA', 'NV', 'AZ'] },
          ],
        },
        actions: [
          { type: 'assign_warehouse', value: warehouses[1].id },
        ],
        priority: 2,
      },
    }),
  ])

  // Create credit transactions
  await Promise.all([
    prisma.creditTransaction.create({
      data: {
        orgId: org.id,
        type: 'EARNED',
        amount: 25.50,
        description: 'Shipping credits earned from labels purchased',
        reference: 'BATCH-001',
      },
    }),
    prisma.creditTransaction.create({
      data: {
        orgId: org.id,
        type: 'SPENT',
        amount: 12.75,
        description: 'Credits used for label purchase',
        reference: 'LABEL-12345',
      },
    }),
  ])

  console.log('✅ Database seeded successfully!')
  console.log(`📊 Created:`)
  console.log(`   - 1 organization (${org.name})`)
  console.log(`   - 1 user (${user.email})`)
  console.log(`   - ${stores.length} stores`)
  console.log(`   - ${warehouses.length} warehouses`)
  console.log(`   - ${binLocations.length} bin locations`)
  console.log(`   - ${skus.length} SKUs`)
  console.log(`   - ${orders.length} orders`)
  console.log(`   - 2 automation rules`)
  console.log(`   - 2 credit transactions`)
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })