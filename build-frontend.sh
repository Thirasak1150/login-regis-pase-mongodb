#!/bin/bash

# Build script for Next.js frontend
# This script builds the frontend locally and prepares files for deployment

set -e

echo "🚀 Building Next.js frontend..."

# Navigate to frontend directory
cd next-frontend

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the application
echo "🔨 Building application..."
npm run build

# Create dist directory for deployment files
echo "📁 Preparing deployment files..."
mkdir -p ../dist/frontend

# Copy built files
cp -r .next/standalone/* ../dist/frontend/
cp -r .next/static ../dist/frontend/.next/
cp -r public ../dist/frontend/

# Copy package.json for dependencies info
cp package.json ../dist/frontend/

echo "✅ Frontend build completed!"
echo "📂 Built files are in: ./dist/frontend/"
echo "🐳 You can now deploy using the pre-built files"