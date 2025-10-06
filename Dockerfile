# Multi-stage build for React application

# Stage 1: Build the application
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
ENV VITE_API_URL=https://zesty-delight-production-472d.up.railway.app
RUN npm run build

# Verify build
RUN ls -la /app/dist && echo "Build files:" && find /app/dist -type f | head -10

# Stage 2: Production server
FROM node:18-alpine AS production

WORKDIR /app

# Copy package.json and install only production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy server and built app
COPY server.js ./
COPY --from=build /app/dist ./dist

# Verify everything is in place
RUN ls -la . && echo "Dist contents:" && ls -la ./dist/

# Expose port and start
EXPOSE 8080
CMD ["node", "server.js"]