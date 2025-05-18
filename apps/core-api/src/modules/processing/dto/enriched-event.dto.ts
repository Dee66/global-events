import { IsString, IsObject } from 'class-validator';

export class EnrichedEventDto {
  @IsString()
  eventId: string;

  @IsObject()
  enrichedPayload: any;

  @IsString()
  enrichmentType: string;

  @IsString()
  correlationId: string;
}