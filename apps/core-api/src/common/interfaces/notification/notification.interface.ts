export interface Notification {
  id: string;
  userId: string;
  eventId: string;
  channel: 'websocket' | 'email' | 'push';
  status: 'pending' | 'sent' | 'failed';
  createdAt: string;
}