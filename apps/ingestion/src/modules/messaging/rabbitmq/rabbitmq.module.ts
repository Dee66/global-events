import { Module } from '@nestjs/common';
import { RabbitMQModule as NestRabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitMQService } from './rabbitmq.service';

@Module({
  imports: [
    NestRabbitMQModule.forRoot({
      exchanges: [
        { name: 'events.exchange', type: 'topic' },
      ],
      uri: process.env.RABBITMQ_URI || 'amqp://guest:guest@rabbitmq:5672',
      connectionInitOptions: { wait: false },
    }),
  ],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}