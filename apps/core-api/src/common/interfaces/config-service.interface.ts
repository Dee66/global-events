export interface ConfigService {
  get<T = any>(key: string): T | undefined;
}