import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
  Inject,
} from "@nestjs/common";
import { Channel, ChannelModel, connect } from "amqplib";
import { ConfigType } from '@nestjs/config';
import configuration from "src/config/configuration";
import { RabbitMessage } from "src/common/interfaces/messaging/rabbit-message.interface";

async function waitForRabbit(
  uri: string,
  retries = 5,
  delay = 2000
): Promise<ChannelModel> {
  for (let i = 0; i < retries; i++) {
    try {
      return await connect(uri);
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw new Error("Failed to connect to RabbitMQ after retries");
}

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private connection: ChannelModel | null = null;
  private channel: Channel | null = null;
  private readonly logger = new Logger(RabbitMQService.name);

  constructor(
    @Inject(configuration.KEY)
    private config: ConfigType<typeof configuration>,
  ) {}

  async onModuleInit() {
    const uri = this.config.rabbitmq.uri;
    this.logger.log(`Connecting to RabbitMQ at: ${uri}`);
    try {
      this.connection = await waitForRabbit(uri, 10, 3000);
      this.channel = await this.connection.createChannel();

      // Assert exchange
      await this.channel.assertExchange('events.exchange', 'topic', { durable: true });

      // Assert and bind queues
      const queueBindings = [
        { queue: 'user.activity.queue', routingKey: 'user.activity.*' },
        { queue: 'device.telemetry.queue', routingKey: 'device.telemetry.*' },
        { queue: 'alerts.queue', routingKey: 'alerts.*' },
        { queue: 'audit.events.queue', routingKey: '#' },
        { queue: 'notifications.queue', routingKey: 'notifications.*' },
      ];

      for (const { queue, routingKey } of queueBindings) {
        await this.channel.assertQueue(queue, { durable: true });
        await this.channel.bindQueue(queue, 'events.exchange', routingKey);
      }

      this.logger.log("All RabbitMQ queues and bindings asserted.");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      this.logger.warn(
        "RabbitMQ not available (scaffolding mode): " + errorMessage
      );
      this.connection = null;
      this.channel = null;
      // DO NOT throw or exit!
    }
  }

  async publish(queue: string, message: string) {
    if (this.channel) {
      this.channel.sendToQueue(queue, Buffer.from(message), {
        persistent: true,
      });
    } else {
      this.logger.warn("RabbitMQ channel not available, message not sent.");
    }
  }

  async consume(queue: string, callback: (msg: any) => void) {
    if (this.channel) {
      this.channel.consume(queue, (msg: any) => {
        if (msg) {
          callback(msg);
          if (this.channel) {
            this.channel.ack(msg);
          }
        }
      });
    } else {
      this.logger.warn("RabbitMQ channel not available, cannot consume.");
    }
  }

  async consumeTyped(queue: string, callback: (msg: RabbitMessage) => void) {
    if (this.channel) {
      this.channel.consume(queue, (msg: any) => {
        if (msg) {
          try {
            const content = JSON.parse(msg.content.toString());
            // Optionally: validate content as RabbitMessage here
            callback(content);
          } catch (err) {
            this.logger.error(`Failed to parse message from ${queue}: ${err}`);
          }
          this.channel!.ack(msg);
        }
      });
    } else {
      this.logger.warn(`RabbitMQ channel not available, cannot consume from ${queue}.`);
    }
  }

  async testConnection() {
    if (this.channel) {
      await this.channel.assertQueue("test_queue");
      this.channel.sendToQueue("test_queue", Buffer.from("hello"));
    }
  }

  async onModuleDestroy() {
    if (this.channel) await this.channel.close();
    if (this.connection) await this.connection.close();
  }
}
