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

# Stage 2: Serve with Node.js (Railway compatible)
FROM node:18-alpine AS production

# Set working directory
WORKDIR /app

# Install a simple static file server
RUN npm install -g serve

# Copy built application from build stage
COPY --from=build /app/dist ./dist

# Create a simple test file
RUN echo '<h1>Server is working!</h1>' > ./dist/test.html

# Debug: List contents
RUN ls -la ./dist

# Expose port (Railway will set the PORT env var)
EXPOSE ${PORT:-3000}

# Start the server on Railway's PORT or default to 3000
CMD ["sh", "-c", "echo 'Starting server on port ${PORT:-3000}...' && serve -s dist -l ${PORT:-3000}"]