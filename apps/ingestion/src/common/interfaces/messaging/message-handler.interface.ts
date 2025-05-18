export interface MessageHandler {
  handleMessage(message: any): Promise<void>;
}