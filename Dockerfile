# Production Dockerfile for Dokploy Deployment
FROM node:20-alpine AS runner

# Set app working directory
WORKDIR /app

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Copy package definition
COPY package.json ./

# Copy application code
COPY config.js ./
COPY server.js ./
COPY public/ ./public/

# Use non-root user for security
USER node

# Expose application port
EXPOSE 3000

# Container healthcheck for Dokploy / Traefik
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/health || exit 1

# Start application
CMD ["npm", "start"]
