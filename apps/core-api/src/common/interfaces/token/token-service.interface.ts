export interface TokenService {
  generateToken(payload: any): Promise<string>;
  verifyToken(token: string): Promise<any>;
}