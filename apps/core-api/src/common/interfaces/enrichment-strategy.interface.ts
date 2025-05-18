export interface EnrichmentStrategy {
  enrich(event: any): Promise<any>;
}