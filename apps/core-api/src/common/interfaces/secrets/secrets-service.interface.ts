export interface SecretsService {
  getSecret(key: string): Promise<string | undefined>;
}