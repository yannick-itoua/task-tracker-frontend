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

# Stage 2: Serve with Express.js (Railway compatible)
FROM node:18-alpine AS production

# Set working directory
WORKDIR /app

# Copy package.json for production dependencies
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy our custom server
COPY server.js ./

# Copy built application from build stage
COPY --from=build /app/dist ./dist

# Debug: List contents
RUN ls -la ./dist

# Expose port 
EXPOSE 3000

# Start our Express server
CMD ["node", "server.js"]