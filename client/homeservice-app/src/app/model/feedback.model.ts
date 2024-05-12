export interface Feedback {
  id: number;
  serviceId: number;
  message: string;
  rating: number;
  timestamp: Date;
  response?: string;
}
