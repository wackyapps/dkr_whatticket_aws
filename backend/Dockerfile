# Stage 1: Build the application
FROM node:20-alpine AS build

WORKDIR /usr/src/app

# Install dependencies needed for building
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Create the final image
FROM node:20-alpine

WORKDIR /usr/src/app

# Install runtime dependencies
RUN apk add --no-cache netcat-openbsd postgresql-client

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/scripts ./scripts

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Startup script to wait for DB, migrate and start
CMD ["sh", "-c", "while ! nc -z $DB_HOST ${DB_PORT:-5432}; do sleep 1; done; npx sequelize db:migrate && npx sequelize db:seed:all && node dist/server.js"]
