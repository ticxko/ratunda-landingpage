FROM node:20-slim AS builder

# Set working directory
WORKDIR /app

# Install dependencies based on the lockfile if present
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --prefer-offline --no-fund

# Copy source and build
COPY . .
RUN npm run build

### Production image
FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

# Only copy the built assets + package metadata
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

EXPOSE 5000

CMD ["node", "dist/index.cjs"]
