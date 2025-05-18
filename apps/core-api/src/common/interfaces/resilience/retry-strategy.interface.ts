export interface RetryStrategy {
  retry<T>(operation: () => Promise<T>, retries?: number, delayMs?: number): Promise<T>;
}