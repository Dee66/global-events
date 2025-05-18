import { Injectable } from '@nestjs/common';

@Injectable()
export class RbacService {
  // Placeholder for RBAC logic
  hasRole(user: any, role: string): boolean {
    // TODO: Implement role checking
    return false;
  }
}