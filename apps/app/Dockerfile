# apps/app/Dockerfile

# Set base image
FROM node:20-alpine AS base

# Environment setup
ENV PNPM_HOME="/root/.pnpm-global"
ENV PATH="$PNPM_HOME:$PATH"

# Install system dependencies
RUN apk update
RUN apk add --no-cache libc6-compat

# Enable PNPM
RUN corepack enable
RUN corepack prepare pnpm@9.0.0 --activate

FROM base AS builder

# Set working directory
WORKDIR /repo

# Install Turbo
RUN pnpm config set global-bin-dir $PNPM_HOME && pnpm install turbo --global

COPY . .

# Prune files
RUN turbo prune app --docker

FROM base AS installer

# Set working directory
WORKDIR /app

# Copy pruned package manifests
COPY --from=builder /repo/out/json/ .

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy full source code
COPY --from=builder /repo/out/full/ .

# Build the application
RUN pnpm turbo run build --filter=app

FROM base AS runner

# Set working directory
WORKDIR /app

# Create group and user
RUN addgroup -g 1001 applications 
RUN adduser -u 1001 -G applications -s /bin/sh -D app

# Set environment variables
ENV ENVIRONMENT="PRODUCTION"
ENV PORT=3000

# Expose port
EXPOSE 3000

# Copy files
COPY --from=installer /app/apps/app/.next/standalone ./
COPY --from=installer /app/apps/app/.next/static ./apps/app/.next/static
COPY --from=installer /app/apps/app/public ./apps/app/public
COPY --from=installer /app/apps/app/next.config.ts ./apps/app/next.config.ts
COPY --from=installer /app/apps/app/package.json ./apps/app/package.json
COPY --from=installer /app/node_modules ./node_modules

# Change ownership
RUN chown -R app:applications /app

# Run as non-root user
USER app

# Start application
CMD ["node", "apps/app/server.js"]