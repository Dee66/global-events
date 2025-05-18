export interface RabbitMessage {
  messageId: string;
  userId: string;
  deviceId: string;
  eventType: string;
  payload: any;
  timestamp: string;
  metadata?: {
    ip?: string;
    geo?: { lat: number; lng: number };
    [key: string]: any;
  };
  fields?: Record<string, any>;
  properties?: Record<string, any>;
}