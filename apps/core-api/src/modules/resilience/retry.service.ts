import { Injectable } from '@nestjs/common';

@Injectable()
export class RetryService {
  // Placeholder for retry logic
  async retry<T>(operation: () => Promise<T>, retries = 3, delayMs = 1000): Promise<T> {
    let lastError;
    for (let i = 0; i < retries; i++) {
      try {
        return await operation();
      } catch (err) {
        lastError = err;
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
    throw lastError;
  }
}