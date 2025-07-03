# Dockerfile for MERN Stack Application with Authentication
# This Dockerfile sets up a Node.js environment for a MERN stack application with authentication.
# This assumes that you're using mongoDB Atlas or another cloud MongoDB service.
# If you're using a local MongoDB instance, you may need to adjust the connection string in your application code.
# or use the docker-compose.yml file to set up a MongoDB service.

# Use Node.js LTS version
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json files first (for better caching)
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Install backend dependencies (production only)
# Install frontend dependencies (including dev dependencies for build)
RUN cd backend && npm install -s --omit=dev && \
    cd ../frontend && npm install -s

# Copy source code (node_modules should be ignored by .dockerignore)
COPY backend/ ./backend/
COPY frontend/ ./frontend/

# Copy environment file
COPY .env ./.env

# Set NODE_ENV to production for the build process
ENV NODE_ENV="development"

# Build the frontend
RUN cd frontend && npm run build

# Remove frontend node_modules and source after build to reduce image size
RUN rm -rf frontend/node_modules frontend/src

# Set environment variables for production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Change to backend directory and start the application
WORKDIR /app/backend
CMD ["node", "index.js"]