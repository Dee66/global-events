FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Always install devDependencies for hot reload/dev mode
RUN npm install --include=dev

COPY . .

RUN apk add --no-cache bash
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# CMD is overridden by docker-compose.override.yml in dev mode
CMD ["/wait-for-it.sh", "rabbitmq:5672", "--", "node", "dist/main.js"]