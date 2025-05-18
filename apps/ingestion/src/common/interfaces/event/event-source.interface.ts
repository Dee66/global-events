export interface EventSource {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  onEvent(callback: (event: any) => void): void;
}