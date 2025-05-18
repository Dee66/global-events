export interface RbacService {
  hasRole(user: any, role: string): boolean;
}