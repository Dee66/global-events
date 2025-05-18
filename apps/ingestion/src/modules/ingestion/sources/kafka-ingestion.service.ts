import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { KafkaService } from '../../messaging/kafka/kafka.service';
import { KafkaMessage } from '../../../common/interfaces/messaging/kafka-message.interface';
import { KafkaTopics } from '../../../common/enums/kafka-topics.enum';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { KafkaMessageDto } from '../../messaging/dto/kafka-message.dto';

@Injectable()
export class KafkaIngestionService implements OnModuleInit {
  private readonly logger = new Logger(KafkaIngestionService.name);

  private readonly handlers: Record<KafkaTopics, (msg: KafkaMessage) => Promise<void>> = {
    [KafkaTopics.Weather]: this.handleWeather.bind(this),
    [KafkaTopics.News]: this.handleNews.bind(this),
    [KafkaTopics.Sport]: this.handleSport.bind(this),
    [KafkaTopics.Finance]: this.handleFinance.bind(this),
    [KafkaTopics.Traffic]: this.handleTraffic.bind(this),
    [KafkaTopics.Entertainment]: this.handleEntertainment.bind(this),
  };

  constructor(private readonly kafkaService: KafkaService) {}

  async onModuleInit() {
    Object.entries(this.handlers).forEach(([topic, handler]) => {
      this.kafkaService.consume(topic as KafkaTopics, {
        handleMessage: handler,
      });
    });
    this.logger.log('Kafka consumers registered for all topics.');
  }

  private async validateAndLog(msg: KafkaMessage, topic: string): Promise<boolean> {
    const dto = plainToInstance(KafkaMessageDto, msg);
    const errors = await validate(dto);
    if (errors.length) {
      this.logger.warn(`[${topic}] Invalid message: ${JSON.stringify(errors)}`);
      return false;
    }
    return true;
  }

  private async handleWeather(msg: KafkaMessage) {
    if (!(await this.validateAndLog(msg, 'Weather'))) return;
    this.logger.log(`[Weather] Handling weather event: ${JSON.stringify(msg)}`);
  }

  private async handleNews(msg: KafkaMessage) {
    if (!(await this.validateAndLog(msg, 'News'))) return;
    this.logger.log(`[News] Handling news event: ${JSON.stringify(msg)}`);
  }

  private async handleSport(msg: KafkaMessage) {
    if (!(await this.validateAndLog(msg, 'Sport'))) return;
    this.logger.log(`[Sport] Handling sport event: ${JSON.stringify(msg)}`);
  }

  private async handleFinance(msg: KafkaMessage) {
    if (!(await this.validateAndLog(msg, 'Finance'))) return;
    this.logger.log(`[Finance] Handling finance event: ${JSON.stringify(msg)}`);
  }

  private async handleTraffic(msg: KafkaMessage) {
    if (!(await this.validateAndLog(msg, 'Traffic'))) return;
    this.logger.log(`[Traffic] Handling traffic event: ${JSON.stringify(msg)}`);
  }

  private async handleEntertainment(msg: KafkaMessage) {
    if (!(await this.validateAndLog(msg, 'Entertainment'))) return;
    this.logger.log(`[Entertainment] Handling entertainment event: ${JSON.stringify(msg)}`);
  }
}