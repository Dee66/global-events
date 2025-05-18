import { IsString, IsObject, IsISO8601 } from 'class-validator';

export class CreateEventDto {
  @IsString()
  type: string;

  @IsObject()
  payload: any;

  @IsISO8601()
  timestamp: string;
}