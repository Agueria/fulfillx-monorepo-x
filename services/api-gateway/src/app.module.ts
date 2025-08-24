import { Module } from '@nestjs/common'
import { ThrottlerModule } from '@nestjs/throttler'
import { AuthModule } from './auth/auth.module'
import { OrdersModule } from './orders/orders.module'
import { ShippingModule } from './shipping/shipping.module'
import { InventoryModule } from './inventory/inventory.module'
import { AnalyticsModule } from './analytics/analytics.module'
import { RulesModule } from './rules/rules.module'
import { WebhooksModule } from './webhooks/webhooks.module'
import { HealthModule } from './health/health.module'

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000, // 1 minute
      limit: 100, // 100 requests per minute
    }]),
    HealthModule,
    AuthModule,
    OrdersModule,
    ShippingModule,
    InventoryModule,
    AnalyticsModule,
    RulesModule,
    WebhooksModule,
  ],
})
export class AppModule {}