#!/bin/sh
set -e

echo "Installing backend dependencies..."
cd /app/backend
npm install --omit=dev

echo "Installing frontend dependencies..."
cd /app/frontend
npm install

echo "Building frontend..."
npm run build

echo "Starting backend server..."
cd /app/backend
exec npm run start