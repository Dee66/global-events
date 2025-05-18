import { Module } from '@nestjs/common';
import { KafkaIngestionService } from './sources/kafka-ingestion.service';
import { RabbitIngestionService } from './sources/rabbit-ingestion.service';
import { RestIngestionService } from './sources/rest-ingestion.service';
import { NifiIngestionService } from './sources/nifi-ingestion.service';

@Module({
  providers: [
    KafkaIngestionService,
    RabbitIngestionService,
    RestIngestionService,
    NifiIngestionService,
  ],
  exports: [
    KafkaIngestionService,
    RabbitIngestionService,
    RestIngestionService,
    NifiIngestionService,
  ],
})
export class IngestionModule {}