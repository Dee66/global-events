import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';
import { KafkaService } from './kafka/kafka.service';
import { NifiService } from './nifi/nifi.service';

@Module({
  providers: [RabbitMQService, KafkaService, NifiService],
  exports: [RabbitMQService, KafkaService, NifiService],
})
export class MessagingModule {}