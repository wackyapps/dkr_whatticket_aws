# Stage 1: Build the React application
FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
# Use legacy provider for older react versions if needed
ENV NODE_OPTIONS=--openssl-legacy-provider

RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy build artifacts to nginx public directory
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Optional: Copy socket admin UI if needed (adjust path if it changed in your build)
# COPY --from=build /usr/src/app/node_modules/@socket.io/admin-ui/ui/dist /usr/share/nginx/html/socket-admin

# Default Nginx config usually works, but you can copy a custom one if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# Script to generate config.json from environment variables at runtime
CMD ["sh", "-c", "printf '{ \"BACKEND_PROTOCOL\": \"%s\", \"BACKEND_HOST\": \"%s\", \"BACKEND_PORT\": \"%s\", \"BACKEND_PATH\": \"%s\", \"REACT_APP_BACKEND_URL\": \"%s\" }' \"$BACKEND_PROTOCOL\" \"$BACKEND_HOST\" \"$BACKEND_PORT\" \"$BACKEND_PATH\" \"$REACT_APP_BACKEND_URL\" > config.json && nginx -g 'daemon off;'"]
