export interface SessionService {
  createSession(userId: string): Promise<any>;
  findSessionById(sessionId: string): Promise<any | null>;
  destroySession(sessionId: string): Promise<void>;
}