# FulfillX Operations Runbook

## Quick Start Guide

### Prerequisites
- Node.js 18+ and pnpm 8+
- Docker and Docker Compose
- Git

### Local Development Setup

1. **Clone and Install**
```bash
git clone <repository-url>
cd fulfillx-monorepo
pnpm install
```

2. **Environment Setup**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Start Infrastructure**
```bash
pnpm docker:up
```

4. **Initialize Database**
```bash
pnpm setup
```

5. **Start Development**
```bash
pnpm dev
```

### Access Points
- Marketing Site: http://localhost:3000
- Dashboard: http://localhost:3001
- API Gateway: http://localhost:4000
- API Docs: http://localhost:4000/api/docs
- Grafana: http://localhost:3002 (admin/admin)
- MinIO Console: http://localhost:9001 (minioadmin/minioadmin)

## Common Operations

### Database Operations

#### Reset Database
```bash
pnpm db:reset
pnpm db:seed
```

#### Generate Prisma Client
```bash
pnpm db:generate
```

#### View Database
```bash
pnpm db:studio
```

### Development Workflow

#### Start Specific Service
```bash
pnpm --filter @fulfillx/api-gateway dev
```

#### Run Tests
```bash
# All tests
pnpm test

# Specific package
pnpm --filter @fulfillx/orders test

# E2E tests
pnpm e2e
```

#### Build for Production
```bash
pnpm build
```

### Docker Operations

#### View Logs
```bash
docker-compose logs -f postgres
docker-compose logs -f redis
```

#### Restart Services
```bash
docker-compose restart postgres
```

#### Clean Up
```bash
docker-compose down -v
docker system prune -f
```

## Monitoring & Debugging

### Health Checks

#### Service Health
```bash
curl http://localhost:4000/health
curl http://localhost:4001/health
```

#### Database Connection
```bash
docker-compose exec postgres pg_isready -U fulfillx
```

#### Redis Connection
```bash
docker-compose exec redis redis-cli ping
```

### Log Analysis

#### Application Logs
```bash
# API Gateway logs
docker-compose logs -f api-gateway

# Service-specific logs
pnpm --filter @fulfillx/orders logs
```

#### Database Queries
```bash
# Enable query logging in PostgreSQL
docker-compose exec postgres psql -U fulfillx -c "ALTER SYSTEM SET log_statement = 'all';"
docker-compose restart postgres
```

### Performance Monitoring

#### Metrics Endpoints
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3002
- Service metrics: http://localhost:4000/metrics

#### Key Metrics to Monitor
- API response times (p95 < 300ms)
- Database connection pool usage
- Queue job processing rates
- Error rates by service

## Troubleshooting Guide

### Common Issues

#### Port Already in Use
```bash
# Find process using port
lsof -i :3000
kill -9 <PID>

# Or use different ports
WEB_PORT=3010 pnpm dev
```

#### Database Connection Issues
```bash
# Check PostgreSQL status
docker-compose ps postgres

# Reset database
docker-compose down postgres
docker volume rm fulfillx-monorepo_postgres_data
docker-compose up -d postgres
```

#### Memory Issues
```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" pnpm dev
```

#### Build Failures
```bash
# Clean all builds
pnpm clean

# Clear pnpm cache
pnpm store prune

# Reinstall dependencies
rm -rf node_modules
pnpm install
```

### Service-Specific Issues

#### API Gateway Not Starting
1. Check environment variables in `.env`
2. Verify database connection
3. Check for port conflicts
4. Review logs for specific errors

#### Orders Service Issues
1. Verify database schema is up to date
2. Check Redis connection for queues
3. Review order state machine logic
4. Check for deadlocks in database

#### Shipping Service Problems
1. Verify carrier API credentials
2. Check rate limiting on carrier APIs
3. Review label generation logs
4. Verify MinIO connection for PDF storage

### Database Issues

#### Migration Problems
```bash
# Reset migrations
pnpm db:reset

# Manual migration
npx prisma migrate dev --name fix-issue
```

#### Performance Issues
```bash
# Analyze slow queries
docker-compose exec postgres psql -U fulfillx -c "
SELECT query, mean_time, calls 
FROM pg_stat_statements 
ORDER BY mean_time DESC 
LIMIT 10;"
```

#### Connection Pool Exhaustion
```bash
# Check active connections
docker-compose exec postgres psql -U fulfillx -c "
SELECT count(*) as active_connections 
FROM pg_stat_activity 
WHERE state = 'active';"
```

## Deployment Procedures

### Production Deployment

#### Pre-deployment Checklist
- [ ] All tests passing
- [ ] Database migrations reviewed
- [ ] Environment variables configured
- [ ] Monitoring alerts configured
- [ ] Rollback plan prepared

#### Deployment Steps
1. **Build and Test**
```bash
pnpm build
pnpm test
pnpm e2e
```

2. **Database Migration**
```bash
npx prisma migrate deploy
```

3. **Deploy Services**
```bash
# Using Docker
docker-compose -f docker-compose.prod.yml up -d

# Using Kubernetes
kubectl apply -f k8s/
```

4. **Verify Deployment**
```bash
# Health checks
curl https://api.fulfillx.com/health

# Smoke tests
pnpm test:smoke
```

### Rollback Procedures

#### Application Rollback
```bash
# Docker
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --scale api-gateway=0
# Deploy previous version
```

#### Database Rollback
```bash
# Only if migration is reversible
npx prisma migrate reset --force
# Restore from backup
```

## Security Procedures

### SSL Certificate Renewal
```bash
# Using Let's Encrypt
certbot renew --nginx
```

### Security Scanning
```bash
# Dependency vulnerabilities
pnpm audit

# Container scanning
docker scan fulfillx/api-gateway:latest
```

### Access Management
```bash
# Rotate JWT secrets
# Update .env files
# Restart all services
```

## Backup & Recovery

### Database Backup
```bash
# Create backup
docker-compose exec postgres pg_dump -U fulfillx fulfillx > backup.sql

# Restore backup
docker-compose exec -T postgres psql -U fulfillx fulfillx < backup.sql
```

### File Storage Backup
```bash
# MinIO backup
mc mirror minio/fulfillx-labels ./backup/labels/
```

### Configuration Backup
```bash
# Environment files
cp .env .env.backup.$(date +%Y%m%d)

# Docker volumes
docker run --rm -v fulfillx-monorepo_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres_backup.tar.gz /data
```

## Performance Optimization

### Database Optimization
```sql
-- Add indexes for common queries
CREATE INDEX CONCURRENTLY idx_orders_org_status ON orders(org_id, status);
CREATE INDEX CONCURRENTLY idx_inventory_sku_warehouse ON inventory_levels(sku_id, warehouse_id);

-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM orders WHERE org_id = 'xxx' AND status = 'NEW';
```

### Application Optimization
```bash
# Enable production optimizations
NODE_ENV=production pnpm build

# Use PM2 for process management
pm2 start ecosystem.config.js
```

### Caching Strategy
```bash
# Redis cache warming
redis-cli FLUSHALL
# Restart services to rebuild cache
```

## Maintenance Tasks

### Daily Tasks
- [ ] Check service health dashboards
- [ ] Review error logs
- [ ] Monitor queue processing
- [ ] Verify backup completion

### Weekly Tasks
- [ ] Update dependencies
- [ ] Review performance metrics
- [ ] Clean up old logs
- [ ] Security scan results

### Monthly Tasks
- [ ] Database maintenance (VACUUM, REINDEX)
- [ ] Certificate renewal check
- [ ] Capacity planning review
- [ ] Disaster recovery test

## Emergency Procedures

### Service Outage Response
1. **Assess Impact**
   - Check monitoring dashboards
   - Identify affected services
   - Estimate user impact

2. **Immediate Response**
   - Scale up healthy services
   - Enable maintenance mode if needed
   - Communicate with stakeholders

3. **Investigation**
   - Collect logs and metrics
   - Identify root cause
   - Document findings

4. **Resolution**
   - Apply fix or rollback
   - Verify service restoration
   - Post-mortem analysis

### Data Breach Response
1. **Immediate Actions**
   - Isolate affected systems
   - Preserve evidence
   - Notify security team

2. **Assessment**
   - Determine scope of breach
   - Identify compromised data
   - Assess legal requirements

3. **Containment**
   - Patch vulnerabilities
   - Reset credentials
   - Update security measures

4. **Recovery**
   - Restore from clean backups
   - Implement additional monitoring
   - Conduct security audit

## Contact Information

### On-Call Rotation
- Primary: [Contact Info]
- Secondary: [Contact Info]
- Escalation: [Contact Info]

### External Vendors
- Cloud Provider: [Support Info]
- Database Support: [Support Info]
- Security Team: [Contact Info]