export interface StorageAdapter {
  save(data: any): Promise<void>;
  findById(id: string): Promise<any | null>;
}