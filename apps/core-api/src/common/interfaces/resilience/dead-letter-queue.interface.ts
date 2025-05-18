export interface DeadLetterQueue {
  sendToDLQ(message: any, reason?: string): Promise<void>;
  // Add more methods as needed for DLQ abstraction
}