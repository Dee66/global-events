import { IsString, IsObject, IsOptional, IsISO8601 } from 'class-validator';

export class KafkaMessageDto {
  @IsString()
  messageId: string;

  @IsString()
  source: string;

  @IsString()
  eventType: string;

  @IsObject()
  payload: any;

  @IsISO8601()
  timestamp: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}