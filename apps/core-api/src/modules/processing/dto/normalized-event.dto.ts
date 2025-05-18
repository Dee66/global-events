import { IsString, IsObject } from 'class-validator';

export class NormalizedEventDto {
  @IsString()
  eventId: string;

  @IsObject()
  normalizedPayload: any;

  @IsString()
  schemaVersion: string;

  @IsString()
  correlationId: string;
}