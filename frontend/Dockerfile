# Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm config set fetch-timeout 60000 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm install && \
    npm cache clean --force

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
RUN addgroup -g 1001 -S appgroup && adduser -u 1001 -S appuser -G appgroup

COPY --from=build /app/dist/ecommerce-frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN chown -R appuser:appgroup /usr/share/nginx/html

USER appuser
EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]