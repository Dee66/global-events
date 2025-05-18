export interface EventEnricher {
  enrich(event: any): Promise<any>;
}