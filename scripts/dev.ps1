# FulfillX Development Startup Script for Windows

Write-Host "🚀 Starting FulfillX Development Environment..." -ForegroundColor Green

# Check if Docker is running
try {
    docker info | Out-Null
} catch {
    Write-Host "❌ Docker is not running. Please start Docker first." -ForegroundColor Red
    exit 1
}

# Check if pnpm is installed
if (!(Get-Command pnpm -ErrorAction SilentlyContinue)) {
    Write-Host "❌ pnpm is not installed. Please install pnpm first." -ForegroundColor Red
    Write-Host "   npm install -g pnpm" -ForegroundColor Yellow
    exit 1
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Blue
pnpm install

# Start infrastructure services
Write-Host "🐳 Starting infrastructure services..." -ForegroundColor Blue
docker-compose up -d postgres redis minio

# Wait for services to be ready
Write-Host "⏳ Waiting for services to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Generate Prisma client
Write-Host "🔧 Generating Prisma client..." -ForegroundColor Blue
Set-Location packages/database
pnpm db:generate
Set-Location ../..

# Push database schema
Write-Host "🗄️  Setting up database schema..." -ForegroundColor Blue
Set-Location packages/database
pnpm db:push
Set-Location ../..

# Seed database
Write-Host "🌱 Seeding database..." -ForegroundColor Blue
Set-Location packages/database
pnpm db:seed
Set-Location ../..

# Build packages
Write-Host "🔨 Building packages..." -ForegroundColor Blue
pnpm build:packages

Write-Host "✅ Development environment is ready!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Available services:" -ForegroundColor Cyan
Write-Host "   - Marketing Site: http://localhost:3000"
Write-Host "   - Dashboard: http://localhost:3001"
Write-Host "   - API Gateway: http://localhost:4000"
Write-Host "   - API Docs: http://localhost:4000/api"
Write-Host "   - Database Studio: pnpm db:studio (from packages/database)"
Write-Host "   - MinIO Console: http://localhost:9001 (admin/password123)"
Write-Host ""
Write-Host "🚀 To start the applications:" -ForegroundColor Cyan
Write-Host "   pnpm dev"
Write-Host ""
Write-Host "📊 To view monitoring:" -ForegroundColor Cyan
Write-Host "   docker-compose up -d prometheus grafana"
Write-Host "   Grafana: http://localhost:3003 (admin/admin)"