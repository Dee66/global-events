import { Module } from '@nestjs/common';
import { WebSocketNotificationService } from './channels/websocket-notification.service';
import { EmailNotificationService } from './channels/email-notification.service';
import { PushNotificationService } from './channels/push-notification.service';

@Module({
  providers: [
    WebSocketNotificationService,
    EmailNotificationService,
    PushNotificationService,
  ],
  exports: [
    WebSocketNotificationService,
    EmailNotificationService,
    PushNotificationService,
  ],
})
export class NotificationModule {}