#!/bin/bash

# FulfillX Development Startup Script

echo "🚀 Starting FulfillX Development Environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install pnpm first."
    echo "   npm install -g pnpm"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Start infrastructure services
echo "🐳 Starting infrastructure services..."
docker-compose up -d postgres redis minio

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Generate Prisma client
echo "🔧 Generating Prisma client..."
cd packages/database
pnpm db:generate
cd ../..

# Push database schema
echo "🗄️  Setting up database schema..."
cd packages/database
pnpm db:push
cd ../..

# Seed database
echo "🌱 Seeding database..."
cd packages/database
pnpm db:seed
cd ../..

# Build packages
echo "🔨 Building packages..."
pnpm build:packages

echo "✅ Development environment is ready!"
echo ""
echo "🌐 Available services:"
echo "   - Marketing Site: http://localhost:3000"
echo "   - Dashboard: http://localhost:3001"
echo "   - API Gateway: http://localhost:4000"
echo "   - API Docs: http://localhost:4000/api"
echo "   - Database Studio: pnpm db:studio (from packages/database)"
echo "   - MinIO Console: http://localhost:9001 (admin/password123)"
echo ""
echo "🚀 To start the applications:"
echo "   pnpm dev"
echo ""
echo "📊 To view monitoring:"
echo "   docker-compose up -d prometheus grafana"
echo "   Grafana: http://localhost:3003 (admin/admin)"