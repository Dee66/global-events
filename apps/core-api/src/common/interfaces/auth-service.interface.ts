export interface AuthService {
  validateUser(credentials: any): Promise<any | null>;
}