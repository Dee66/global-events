import { IsString, IsObject, IsISO8601 } from 'class-validator';

export class NifiMessageDto {
  @IsString()
  flowId: string;

  @IsObject()
  data: any;

  @IsISO8601()
  timestamp: string;
}