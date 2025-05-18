import { IsString, IsObject, IsISO8601 } from 'class-validator';

export class EventStorageDto {
  @IsString()
  eventId: string;

  @IsObject()
  rawPayload: any;

  @IsObject()
  normalizedPayload: any;

  @IsISO8601()
  receivedAt: string;

  @IsString()
  schemaVersion: string;
}