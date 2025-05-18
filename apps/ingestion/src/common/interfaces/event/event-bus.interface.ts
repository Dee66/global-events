export interface EventBus {
  publish(event: any): Promise<void>;
  subscribe(eventType: string, handler: (event: any) => void): void;
}