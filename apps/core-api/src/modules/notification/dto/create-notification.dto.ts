import { IsString, IsIn, IsISO8601 } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  userId: string;

  @IsString()
  eventId: string;

  @IsIn(['websocket', 'email', 'push'])
  channel: 'websocket' | 'email' | 'push';

  @IsIn(['pending', 'sent', 'failed'])
  status: 'pending' | 'sent' | 'failed';

  @IsISO8601()
  createdAt: string;
}