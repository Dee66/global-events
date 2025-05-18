export interface UserService {
  findAll(): Promise<any[]>;
  findById(id: string): Promise<any | null>;
}