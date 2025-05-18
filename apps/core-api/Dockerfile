FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

RUN apk add --no-cache bash
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

CMD ["/wait-for-it.sh", "rabbitmq:5672", "--", "node", "dist/main.js"]