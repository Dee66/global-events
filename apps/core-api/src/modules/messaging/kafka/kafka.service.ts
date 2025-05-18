import { Injectable, OnModuleInit } from "@nestjs/common";
import { Consumer, Kafka, Producer } from "kafkajs";
import { MessageHandler } from "../interfaces/message-handler.interface";

@Injectable()
export class KafkaService implements OnModuleInit {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;

  constructor() {
    this.kafka = new Kafka({
      clientId: "gobal-events-app",
      brokers: ["kafka:9092"],
    });
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: "nestjs-group" });
  }

  async onModuleInit() {
    try {
      await this.producer.connect();
      await this.consumer.connect();
      console.log('KafkaService: Connected to Kafka');
    } catch (err: any) {
      console.warn('KafkaService: Kafka not available (scaffolding mode):', err?.message || err);
    }
  }

  async produce(topic: string, message: any) {
    try {
      await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
      });
    } catch (error) {
      throw new Error(
        `Failed to send data to NiFi: ${error instanceof Error ? error.message : error}`
      );
    }
  }

  async consume(topic: string, handler: MessageHandler) {
    await this.consumer.subscribe({ topic, fromBeginning: true });
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const parsedMessage = message.value
          ? JSON.parse(message.value.toString())
          : null;
        if (parsedMessage) await handler.handleMessage(parsedMessage);
      },
    });
  }

  async disconnect() {
    await this.producer.disconnect();
    await this.consumer.disconnect();
  }
}
