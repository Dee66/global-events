export interface NotificationService {
  sendNotification(notification: any): Promise<void>;
}