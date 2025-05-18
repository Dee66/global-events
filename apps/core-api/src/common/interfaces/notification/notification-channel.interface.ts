export interface NotificationChannel {
  send(notification: any): Promise<void>;
}