export interface IngestionService {
  ingest(): Promise<void>;
}