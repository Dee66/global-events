import { IsString, IsObject, IsISO8601 } from 'class-validator';

export class DlqMessageDto {
  @IsString()
  messageId: string;

  @IsObject()
  payload: any;

  @IsString()
  reason: string;

  @IsISO8601()
  failedAt: string;
}