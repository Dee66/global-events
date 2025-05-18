export interface MetricsService {
  increment(metric: string, value?: number, labels?: Record<string, any>): void;
  observe(metric: string, value: number, labels?: Record<string, any>): void;
  set(metric: string, value: number, labels?: Record<string, any>): void;
}