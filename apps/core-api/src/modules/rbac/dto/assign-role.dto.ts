import { IsString, IsIn } from 'class-validator';

export class AssignRoleDto {
  @IsString()
  userId: string;

  @IsIn(['admin', 'curator', 'viewer'])
  role: 'admin' | 'curator' | 'viewer';
}