FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Create env.js with environment variables at runtime
RUN echo '#!/bin/sh' > /app/entrypoint.sh && \
    echo 'echo "(function (window) {" > /app/src/assets/env.js' >> /app/entrypoint.sh && \
    echo 'echo "  window[\"env\"] = window[\"env\"] || {};" >> /app/src/assets/env.js' >> /app/entrypoint.sh && \
    echo 'echo "  window[\"env\"][\"API_BASE_URL\"] = \"${API_BASE_URL:-http://localhost:8080/api}\";" >> /app/src/assets/env.js' >> /app/entrypoint.sh && \
    echo 'echo "})(this);" >> /app/src/assets/env.js' >> /app/entrypoint.sh && \
    echo 'npm start' >> /app/entrypoint.sh && \
    chmod +x /app/entrypoint.sh

EXPOSE 4200

CMD ["/app/entrypoint.sh"]