# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built application
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]

# Development/Test stage
FROM node:18-alpine AS test

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev for testing)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Default stage for testing
FROM test AS default