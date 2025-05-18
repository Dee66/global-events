export interface Job {
  id: string;
  type: string;
  payload: any;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  createdAt: string;
}