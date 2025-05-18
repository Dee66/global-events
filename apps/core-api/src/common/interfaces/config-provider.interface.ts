export interface ConfigProvider {
  get<T = any>(key: string): T | undefined;
}