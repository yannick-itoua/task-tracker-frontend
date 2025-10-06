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
RUN echo "Building with VITE_API_URL: $VITE_API_URL"

# Build the application
RUN npm run build

# Debug: Check if build was successful
RUN ls -la /app/dist

# Stage 2: Serve with Nginx
FROM nginx:alpine AS production

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Create a simple test file
RUN echo '<h1>Nginx is working!</h1>' > /usr/share/nginx/html/test.html

# Debug: List contents and test nginx config
RUN ls -la /usr/share/nginx/html && \
    echo "Contents of nginx html directory:" && \
    cat /usr/share/nginx/html/index.html | head -10 || echo "No index.html found" && \
    nginx -t && \
    echo "Nginx config test passed"

# Expose port
EXPOSE 80

# Start nginx with verbose output
CMD ["sh", "-c", "echo 'Starting nginx with debug info...' && nginx -t && nginx -g 'daemon off; error_log /dev/stderr info;'"]