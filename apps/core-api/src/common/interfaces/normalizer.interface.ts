export interface Normalizer {
  normalize(event: any): Promise<any>;
}