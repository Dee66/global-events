export interface SubscriptionService {
  findByUserId(userId: string): Promise<any[]>;
  subscribe(userId: string, filter: any): Promise<void>;
  unsubscribe(userId: string, subscriptionId: string): Promise<void>;
}