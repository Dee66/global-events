export interface RabbitMessage {
  content: Buffer;
  fields?: Record<string, any>;
  properties?: Record<string, any>;
}