export interface RestMessage {
  body: any;
  headers?: Record<string, any>;
  query?: Record<string, any>;
  params?: Record<string, any>;
}