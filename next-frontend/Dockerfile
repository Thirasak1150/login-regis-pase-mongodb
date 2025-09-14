# Multi-stage build for Next.js
# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Check if standalone build was created, if not use server build
RUN ls -la .next/ && \
    if [ ! -d ".next/standalone" ]; then \
        echo "WARNING: Standalone build not found. Using server build instead."; \
        echo "Contents of .next directory:"; \
        ls -la .next/; \
        mkdir -p .next/standalone; \
        cp -r .next/server .next/standalone/; \
        echo '{"type":"module"}' > .next/standalone/package.json; \
    fi

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Install curl for health check
RUN apk add --no-cache curl

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
# Copy standalone files or fallback to server build
COPY --from=builder /app/.next/standalone ./ 
COPY --from=builder /app/.next/static ./.next/static

# Create server.js if it doesn't exist
RUN if [ ! -f "server.js" ]; then \
        echo "Creating server.js fallback..."; \
        echo 'import { createServer } from "http";' > server.js; \
        echo 'import { parse } from "url";' >> server.js; \
        echo 'import next from "next";' >> server.js; \
        echo 'const dev = process.env.NODE_ENV !== "production";' >> server.js; \
        echo 'const hostname = "0.0.0.0";' >> server.js; \
        echo 'const port = process.env.PORT || 3000;' >> server.js; \
        echo 'const app = next({ dev, hostname, port });' >> server.js; \
        echo 'const handle = app.getRequestHandler();' >> server.js; \
        echo 'app.prepare().then(() => {' >> server.js; \
        echo '  createServer(async (req, res) => {' >> server.js; \
        echo '    try {' >> server.js; \
        echo '      const parsedUrl = parse(req.url, true);' >> server.js; \
        echo '      await handle(req, res, parsedUrl);' >> server.js; \
        echo '    } catch (err) {' >> server.js; \
        echo '      console.error("Error occurred handling", req.url, err);' >> server.js; \
        echo '      res.statusCode = 500;' >> server.js; \
        echo '      res.end("internal server error");' >> server.js; \
        echo '    }' >> server.js; \
        echo '  }).listen(port, (err) => {' >> server.js; \
        echo '    if (err) throw err;' >> server.js; \
        echo '    console.log(`> Ready on http://${hostname}:${port}`);' >> server.js; \
        echo '  });' >> server.js; \
        echo '});' >> server.js; \
    fi

# Change ownership
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED 1

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# Start the application
CMD ["node", "server.js"]