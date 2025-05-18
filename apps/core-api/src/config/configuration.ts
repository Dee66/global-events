import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  app: {
    port: parseInt(process.env.APP_PORT ?? '3000', 10),
    environment: process.env.NODE_ENV || 'development',
  },
  rabbitmq: {
    uri: process.env.RABBITMQ_URI || 'amqp://rabbitmq',
    queue: process.env.RABBITMQ_QUEUE || 'default_queue',
  },
  kafka: {
    brokers: (process.env.KAFKA_BROKERS || 'kafka:9092').split(','),
    topic: process.env.KAFKA_TOPIC || 'default_topic',
  },
  nifi: {
    baseUrl: process.env.NIFI_BASE_URL || 'http://nifi:8080/nifi-api',
  },
  security: {
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  },
}));