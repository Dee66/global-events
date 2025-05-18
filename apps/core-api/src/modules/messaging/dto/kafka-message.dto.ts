import { IsString, IsObject, IsISO8601 } from 'class-validator';

export class KafkaMessageDto {
  @IsString()
  key: string;

  @IsObject()
  value: any;

  @IsISO8601()
  timestamp: string;
}