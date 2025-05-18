import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  rabbitmq: {
    uri: process.env.RABBITMQ_URI || 'amqp://rabbitmq',
    queue: process.env.RABBITMQ_QUEUE || 'default_queue',
  },
}));