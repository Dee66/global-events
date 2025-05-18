export interface EventProcessor {
  process(event: any): Promise<void>;
}