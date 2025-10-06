# Multi-stage build for React application

# Stage 1: Build the application
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies needed for build)
RUN npm install

# Copy source code
COPY . .

# Set build-time environment variable with default fallback
ARG VITE_API_URL=https://zesty-delight-production-472d.up.railway.app
ENV VITE_API_URL=${VITE_API_URL}

# Debug: Show environment variables and verify they're set
RUN echo "Building with VITE_API_URL: $VITE_API_URL" && \
    echo "Environment check:" && \
    printenv | grep VITE || echo "No VITE vars found"

# Build the application
RUN npm run build

# Debug: Check if build was successful
RUN ls -la /app/dist && echo "Build completed successfully"

# Stage 2: Serve with Nginx
FROM nginx:alpine AS production

# Install curl for health checks
RUN apk add --no-cache curl

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Debug: List contents and test nginx config
RUN ls -la /usr/share/nginx/html && \
    echo "Contents of nginx html directory:" && \
    find /usr/share/nginx/html -type f | head -10 && \
    nginx -t && \
    echo "Nginx config test passed"

# Expose port
EXPOSE 80

# Health check - simplified
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:80/health || exit 1

# Start nginx with error logging
CMD ["sh", "-c", "echo 'Starting nginx...' && nginx -g 'daemon off;'"]