export interface Promotion {
  id: number;
  title: string;
  description: string;
  discount: number;
  validityPeriod: string;
  createdAt: Date;
  updatedAt: Date;
}
