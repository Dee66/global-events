import { IsString, IsIn } from 'class-validator';

export class SendNotificationDto {
  @IsString()
  userId: string;

  @IsString()
  eventId: string;

  @IsIn(['websocket', 'email', 'push'])
  channel: 'websocket' | 'email' | 'push';

  @IsString()
  message: string;
}