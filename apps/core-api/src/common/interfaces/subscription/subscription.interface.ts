export interface Subscription {
  id: string;
  userId: string;
  filter: any; // e.g., { location: string; category: string }
  createdAt: string;
}