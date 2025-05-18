export interface NormalizationStrategy {
  normalize(event: any): Promise<any>;
}