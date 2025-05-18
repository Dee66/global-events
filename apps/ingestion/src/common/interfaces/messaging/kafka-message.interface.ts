export interface KafkaMessage {
  key: string | null;
  value: string;
  headers?: Record<string, any>;
  partition?: number;
  offset?: string;
  timestamp?: string;
}