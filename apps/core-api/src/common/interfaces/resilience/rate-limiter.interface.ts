export interface RateLimiter {
  consume(key: string): Promise<boolean>;
  reset(key: string): Promise<void>;
}