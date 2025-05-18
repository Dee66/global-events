export interface KafkaMessage {
  messageId: string;
  source: string;
  eventType: string;
  payload: any;
  timestamp: string;
  metadata?: {
    partition?: number;
    offset?: string;
    headers?: Record<string, any>;
    [key: string]: any;
  };
}