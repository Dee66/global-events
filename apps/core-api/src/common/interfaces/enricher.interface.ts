export interface Enricher {
  enrich(event: any): Promise<any>;
}