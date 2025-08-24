# FulfillX - Complete E-commerce Fulfillment Platform

A brand-neutral, Veeqo-like system that provides comprehensive shipping, inventory, and order management capabilities for e-commerce businesses.

## Quick Start

### Prerequisites

- Node.js 18+ and pnpm 8+
- Docker and Docker Compose
- PostgreSQL (via Docker)

### Automated Setup (Recommended)

**Linux/macOS:**

```bash
git clone https://github.com/Agueria/fulfillx-monorepo-x
cd fulfillx-monorepo
pnpm setup:dev
```

**Windows:**

```powershell
git clone https://github.com/Agueria/fulfillx-monorepo-x
cd fulfillx-monorepo
pnpm setup:dev:win
```

### Manual Setup

1. **Clone and install dependencies:**

```bash
git clone https://github.com/Agueria/fulfillx-monorepo-x
cd fulfillx-monorepo
pnpm install
```

2. **Set up environment:**

```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Start infrastructure services:**

```bash
pnpm start:infra
```

4. **Initialize database:**

```bash
pnpm db:generate
pnpm db:push
pnpm db:seed
```

5. **Build packages:**

```bash
pnpm build:packages
```

6. **Start development servers:**

```bash
pnpm dev
```

### Access Points

- **Marketing Site**: http://localhost:3000
- **Dashboard**: http://localhost:3001
- **API Gateway**: http://localhost:4000
- **API Documentation**: http://localhost:4000/api
- **Health Check**: http://localhost:4000/health
- **Database Studio**: `pnpm db:studio`
- **Grafana**: http://localhost:3003 (admin/admin)
- **MinIO Console**: http://localhost:9001 (admin/password123)

### Useful Commands

```bash
# Development
pnpm dev                    # Start all services in development mode
pnpm build                  # Build all packages and applications
pnpm test                   # Run all tests
pnpm lint                   # Lint all code

# Database
pnpm db:studio              # Open Prisma Studio
pnpm db:reset               # Reset database with fresh seed data
pnpm db:generate            # Generate Prisma client

# Infrastructure
pnpm start:infra            # Start core infrastructure (DB, Redis, MinIO)
pnpm start:monitoring       # Start monitoring stack (Prometheus, Grafana)
pnpm docker:logs            # View Docker container logs
pnpm docker:clean           # Clean up Docker containers and volumes

# Health & Monitoring
pnpm health                 # Check API Gateway health
```

- **MailHog**: http://localhost:8025

## Project Structure

```
fulfillx-monorepo/
├── apps/
│   ├── web/              # Marketing website (Next.js)
│   ├── dashboard/        # Internal dashboard (Next.js)
│   └── scanner/          # Mobile scanner app (React Native/Expo)
├── services/
│   ├── api-gateway/      # BFF & authentication
│   ├── orders/           # Order management service
│   ├── shipping/         # Shipping & label service
│   ├── inventory/        # Inventory management
│   ├── rules/            # Automation rules engine
│   ├── purchasing/       # Supplier & PO management
│   ├── analytics/        # Profit analyzer & reporting
│   ├── forecasting/      # Demand forecasting
│   ├── notifications/    # Email & notification service
│   └── integrations/     # Marketplace & carrier adapters
├── packages/
│   ├── ui/               # Shared UI components (shadcn/ui)
│   ├── contracts/        # OpenAPI specs & Zod schemas
│   ├── sdk/              # TypeScript SDK
│   ├── database/         # Prisma schema & migrations
│   └── config/           # Shared configuration
└── infra/                # Docker, K8s, monitoring configs
```

## Architecture

### Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend**: NestJS, TypeScript, Prisma ORM
- **Database**: PostgreSQL, Redis, MinIO
- **Queues**: BullMQ with Redis
- **API**: REST with OpenAPI 3.1, Zod validation
- **Auth**: JWT with refresh tokens, RBAC
- **Monitoring**: OpenTelemetry, Prometheus, Grafana
- **Testing**: Vitest, Playwright, React Testing Library

### Key Features

#### Marketing Website

- Responsive design with Tailwind CSS
- SEO optimized with Next.js 14 App Router
- Framer Motion animations
- Accessible components

#### Dashboard Application

- **Orders**: Multi-view table, bulk actions, smart routing, @mentions
- **Inventory**: SKU management, multi-warehouse, bundles/kits, rules
- **Picking**: Batch processing, bin-location routing, barcode scanning
- **Shipping**: Rate shopping, label purchase, tracking, returns
- **Analytics**: Profit analysis, SKU performance, forecasting
- **Rules**: Visual automation builder with DSL

#### Backend Services

- **Microservices**: Domain-driven design with clear boundaries
- **Event Sourcing**: Stock ledger for inventory accuracy
- **State Machines**: Order status, PO receiving, picking workflows
- **Integrations**: Pluggable adapters for carriers and marketplaces
- **Credits System**: Earn/spend model for shipping discounts

## Development

### Available Scripts

```bash
# Development
pnpm dev              # Start all services in development mode
pnpm build            # Build all packages and services
pnpm test             # Run all tests
pnpm e2e              # Run end-to-end tests
pnpm lint             # Lint all code

# Database
pnpm db:generate      # Generate Prisma client
pnpm db:push          # Push schema changes
pnpm db:seed          # Seed with demo data
pnpm db:studio        # Open Prisma Studio

# Infrastructure
pnpm docker:up        # Start Docker services
pnpm docker:down      # Stop Docker services
```

### Demo Data

The seed script creates:

- 1 demo organization with admin user (demo@fulfillx.com / password123)
- 3 connected stores (Shopify, Amazon, eBay)
- 2 warehouses with bin locations
- 50+ demo SKUs with inventory levels
- 200+ sample orders across different statuses
- Automation rules and credit transactions

### API Documentation

Interactive API documentation is available at http://localhost:4000/api/docs when running the API Gateway.

## Testing

### Test Strategy

- **Unit Tests**: Business logic, utilities, pure functions
- **Integration Tests**: API endpoints, database operations
- **Contract Tests**: Service-to-service communication
- **E2E Tests**: Critical user journeys
- **Load Tests**: Performance under realistic load

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests for specific package
pnpm --filter @fulfillx/orders test

# Run E2E tests
pnpm e2e

# Run tests in watch mode
pnpm test --watch
```

## Deployment

### Docker Compose (Development)

```bash
pnpm docker:up
```

### Kubernetes (Production)

Sample K8s manifests are provided in the `k8s/` directory:

```bash
kubectl apply -f k8s/
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

- Database connections
- API keys for carriers and marketplaces
- JWT secrets
- Service ports and URLs
- Observability endpoints

## Monitoring

### Observability Stack

- **Logs**: Structured JSON logs with pino
- **Metrics**: Prometheus metrics collection
- **Traces**: OpenTelemetry distributed tracing
- **Dashboards**: Grafana dashboards for key metrics

### Key Metrics

- Order processing time (p95 < 300ms)
- Rate shopping latency (p95 < 1.5s)
- Label purchase success rate (>99.5%)
- Inventory accuracy (>99.9%)
- API error rates (<0.1%)

## Security

### Security Features

- JWT authentication with refresh tokens
- Row-level security with organization isolation
- Rate limiting and request throttling
- Input validation with Zod schemas
- Audit logging for sensitive operations
- PII minimization and GDPR compliance

### RBAC Roles

- **ADMIN**: Full system access
- **OPS_MANAGER**: Order and inventory management
- **PICKER**: Warehouse operations
- **FINANCE**: Financial data and reports
- **ANALYST**: Read-only analytics access
- **VIEWER**: Basic read-only access

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

### Code Style

- TypeScript strict mode
- ESLint + Prettier for formatting
- Conventional commits
- Component-driven development
- Test-driven development for business logic

## License

This project is licensed under the Apache 2.0 License - see the LICENSE file for details.

## Support

For questions and support:

1. Check the documentation in `/docs`
2. Review the API documentation at `/api/docs`
3. Open an issue on GitHub
4. Contact the development team

---

Built by the FulfillX team
