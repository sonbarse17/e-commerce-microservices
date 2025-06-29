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

# Install wget for health checks
RUN apk add --no-cache wget

COPY --from=build /app/dist/ecommerce-frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY health-check.sh /usr/local/bin/health-check.sh

# Make health check script executable
RUN chmod +x /usr/local/bin/health-check.sh

# Create startup script to replace API_BASE_URL placeholder
RUN echo '#!/bin/sh' > /docker-entrypoint.sh && \
    echo 'sed -i "s|__API_BASE_URL__|${API_BASE_URL}|g" /usr/share/nginx/html/assets/env.js' >> /docker-entrypoint.sh && \
    echo 'nginx -g "daemon off;"' >> /docker-entrypoint.sh && \
    chmod +x /docker-entrypoint.sh

EXPOSE 4200

# Add health check that depends on all backend services
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD /usr/local/bin/health-check.sh

CMD ["/docker-entrypoint.sh"]