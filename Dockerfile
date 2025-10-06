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

# Set build-time environment variable
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Debug: Show environment variables
RUN echo "Building with VITE_API_URL: $VITE_API_URL"

# Build the application
RUN npm run build

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
    nginx -t && \
    echo "Nginx config test passed"

# Expose port
EXPOSE 80

# Health check - simplified
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:80/health || exit 1

# Start nginx (run as root to avoid permission issues)
CMD ["nginx", "-g", "daemon off;"]