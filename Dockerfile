# Backend Dockerfile
FROM node:18-alpine AS backend
WORKDIR /app
COPY task_management_api ./task_management_api
WORKDIR /app/task_management_api
RUN npm install && npm run build

# Frontend Dockerfile
FROM node:18-alpine AS frontend
WORKDIR /app
COPY task_management_front ./task_management_front
WORKDIR /app/task_management_front
RUN npm install && npm run build

# Production image
FROM node:18-alpine AS production
WORKDIR /app
COPY --from=backend /app/task_management_api .
COPY --from=frontend /app/task_management_front/build ./public
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/index.js"]
