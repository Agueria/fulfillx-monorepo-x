import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ThrottlerGuard } from '@nestjs/throttler'
import helmet from 'helmet'
import * as compression from 'compression'
import * as cors from 'cors'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Security middleware
  app.use(helmet())
  app.use(compression())
  app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  }))

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }))

  // Global prefix
  app.setGlobalPrefix('api')

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('FulfillX API')
    .setDescription('Complete e-commerce fulfillment platform API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication endpoints')
    .addTag('orders', 'Order management')
    .addTag('shipping', 'Shipping and labels')
    .addTag('inventory', 'Inventory management')
    .addTag('analytics', 'Analytics and reporting')
    .addTag('rules', 'Automation rules')
    .addTag('webhooks', 'Webhook management')
    .addTag('health', 'Health checks')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'FulfillX API Documentation',
    customfavIcon: '/favicon.ico',
    customCss: '.swagger-ui .topbar { display: none }',
  })

  // Start server
  const port = process.env.PORT || 4000
  await app.listen(port)
  
  console.log(`FulfillX API Gateway running on http://localhost:${port}`)
  console.log(`API Documentation available at http://localhost:${port}/api`)
  console.log(`Health check available at http://localhost:${port}/health`)
}

bootstrap().catch((error) => {
  console.error('Failed to start API Gateway:', error)
  process.exit(1)
})