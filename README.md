# MERN Starter Auth

A starter template for building authentication-enabled MERN (MongoDB, Express, React, Node.js) applications.

## Features

- User registration & login
- JWT authentication with HTTP-only cookies
- Protected routes (backend & frontend)
- React context and provider for authentication
- Automatic frontend build and watch
- Docker support for easy deployment
- Basic project structure for rapid development

## Getting Started

### Prerequisites

- Node.js (for local development)
- Docker & Docker Compose (for containerized setup)

### Quick Start with Docker (Recommended)

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/mern_starter_auth.git
   cd mern_starter_auth
   ```

2. Create environment file:

   ```bash
   cp .env.example .env
   ```

3. Update the `.env` file with your settings:

   ```env
   MONGO_URL=mongodb://mongo:27017/mern_auth
   JWT_SECRET=your_secure_jwt_secret_here
   ```

4. Run with Docker Compose:

   ```bash
   docker-compose up -d
   ```

5. Open your browser to `http://localhost:3000`

### Local Development Setup

Install all dependencies at once:

```bash
cd backend && npm install && cd ../frontend && npm install && cd ..
```

```bash
cd backend && npm run dev:fullstack
```


### Environment Setup

Create a `.env` file in the root directory:

```env
MONGO_URL=mongodb://localhost:27017/mern_auth
PORT=3000
NODE_ENV=dev
JWT_SECRET=your_jwt_secret_here
VITE_API_BASE_URL=http://localhost:3000/api
```

### Running the App

**Docker (Production-like):**

```bash
# With MongoDB included
docker-compose up

# App only (if you have MongoDB running elsewhere)
docker build -t mern-auth .
docker run -p 3000:3000 --env-file .env mern-auth
```

**Development (recommended) - runs both frontend and backend:**

```bash
npm run dev
```

**Development with backend serving built frontend:**

```bash
cd backend
npm run dev:fullstack
```

**Individual services:**

```bash
# Backend only
npm run dev:backend

# Frontend only
npm run dev:frontend
```

**Production:**

```bash
npm run build
npm start
```

## Docker Commands

```bash
# Build the image
docker build -t mern-auth .

# Run with Docker Compose (includes MongoDB)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove volumes (deletes database data)
docker-compose down -v

# Production deployment
docker-compose -f docker-compose.prod.yml up -d
```

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify authentication
- `GET /api/auth/logout` - User logout

## Folder Structure

```
mern_starter_auth/
  ├── backend/           # Express backend
  │   ├── controllers/   # Route controllers
  │   ├── middleware/    # Custom middleware
  │   ├── models/        # Mongoose models
  │   ├── routes/        # Express routes
  │   ├── util/          # Utility functions
  │   └── index.js       # Backend entry point
  ├── frontend/          # React frontend
  │   ├── src/
  │   │   ├── components/  # React components
  │   │   ├── context/     # React context
  │   │   ├── pages/       # Page components
  │   │   └── util/        # Frontend utilities
  │   └── dist/          # Built frontend (production)
  ├── Dockerfile         # Docker configuration
  ├── docker-compose.yml # Development setup
  ├── .env.example       # Environment template
  └── package.json       # Root package.json
```

## License

MIT