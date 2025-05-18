import { IsString, IsObject, IsISO8601 } from 'class-validator';

export class RabbitMessageDto {
  @IsString()
  routingKey: string;

  @IsObject()
  payload: any;

  @IsISO8601()
  timestamp: string;
}