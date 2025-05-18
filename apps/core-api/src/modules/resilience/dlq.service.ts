import { Injectable } from '@nestjs/common';

@Injectable()
export class DlqService {
  // Placeholder for Dead Letter Queue logic
  async sendToDLQ(message: any, reason?: string): Promise<void> {
    // TODO: Implement DLQ logic (e.g., store message for later inspection)
  }
}