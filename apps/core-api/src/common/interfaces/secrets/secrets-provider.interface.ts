export interface SecretsProvider {
  getSecret(key: string): Promise<string | undefined>;
  // Add more methods as needed for your secrets abstraction
}