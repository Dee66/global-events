import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RabbitMQService } from '../../messaging/rabbitmq/rabbitmq.service';
import { RabbitMessage } from '../../../common/interfaces/messaging/rabbit-message.interface';
import { RabbitQueues } from 'src/common/enums/rabbit-queues.enum';

@Injectable()
export class RabbitIngestionService implements OnModuleInit {
  private readonly logger = new Logger(RabbitIngestionService.name);

  private readonly handlers: Record<RabbitQueues, (msg: RabbitMessage) => Promise<void>> = {
    [RabbitQueues.UserActivity]: this.handleUserActivity.bind(this),
    [RabbitQueues.DeviceTelemetry]: this.handleDeviceTelemetry.bind(this),
    [RabbitQueues.Alerts]: this.handleAlert.bind(this),
    [RabbitQueues.AuditEvents]: this.handleAuditEvent.bind(this),
    [RabbitQueues.Notifications]: this.handleNotification.bind(this),
  };

  constructor(private readonly rabbitMQService: RabbitMQService) {}

  async onModuleInit() {
    Object.entries(this.handlers).forEach(([queue, handler]) => {
      this.rabbitMQService.consumeTyped(queue as RabbitQueues, handler);
    });
    this.logger.log('RabbitMQ consumers registered for all queues.');
  }

  private async handleUserActivity(msg: RabbitMessage) {
    this.logger.log(`[UserActivity] Handling user activity: ${JSON.stringify(msg)}`);
  }

  private async handleDeviceTelemetry(msg: RabbitMessage) {
    this.logger.log(`[DeviceTelemetry] Handling device telemetry: ${JSON.stringify(msg)}`);
  }

  private async handleAlert(msg: RabbitMessage) {
    this.logger.log(`[Alerts] Handling alert: ${JSON.stringify(msg)}`);
  }

  private async handleAuditEvent(msg: RabbitMessage) {
    this.logger.log(`[AuditEvents] Handling audit event: ${JSON.stringify(msg)}`);
  }

  private async handleNotification(msg: RabbitMessage) {
    this.logger.log(`[Notifications] Handling notification: ${JSON.stringify(msg)}`);
  }
}