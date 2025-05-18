export interface Tracer {
  startSpan(name: string, options?: any): any;
  endSpan(span: any): void;
  trace<T>(name: string, fn: () => Promise<T>): Promise<T>;
}