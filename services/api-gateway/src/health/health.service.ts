import { Injectable } from '@nestjs/common'

@Injectable()
export class HealthService {
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || '1.0.0',
    }
  }

  async getDetailedHealth() {
    const baseHealth = this.getHealth()
    
    // Check database connectivity
    const dbHealth = await this.checkDatabase()
    
    // Check Redis connectivity
    const redisHealth = await this.checkRedis()
    
    // Check external services
    const externalHealth = await this.checkExternalServices()
    
    const allHealthy = dbHealth.status === 'ok' && 
                      redisHealth.status === 'ok' && 
                      externalHealth.status === 'ok'
    
    return {
      ...baseHealth,
      status: allHealthy ? 'ok' : 'degraded',
      checks: {
        database: dbHealth,
        redis: redisHealth,
        external: externalHealth,
      },
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      },
    }
  }

  private async checkDatabase() {
    try {
      // Mock database check - replace with actual Prisma health check
      return {
        status: 'ok',
        responseTime: Math.floor(Math.random() * 50) + 10,
        message: 'Database connection healthy',
      }
    } catch (error) {
      return {
        status: 'error',
        message: 'Database connection failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  private async checkRedis() {
    try {
      // Mock Redis check - replace with actual Redis health check
      return {
        status: 'ok',
        responseTime: Math.floor(Math.random() * 20) + 5,
        message: 'Redis connection healthy',
      }
    } catch (error) {
      return {
        status: 'error',
        message: 'Redis connection failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  private async checkExternalServices() {
    try {
      // Mock external services check
      const services = ['shipping-api', 'payment-gateway', 'notification-service']
      const results = services.map(service => ({
        name: service,
        status: Math.random() > 0.1 ? 'ok' : 'error',
        responseTime: Math.floor(Math.random() * 200) + 50,
      }))
      
      const allOk = results.every(r => r.status === 'ok')
      
      return {
        status: allOk ? 'ok' : 'degraded',
        services: results,
      }
    } catch (error) {
      return {
        status: 'error',
        message: 'External services check failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }
}