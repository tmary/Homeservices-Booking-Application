import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export const PromotionSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  discount: Number,
  validityPeriod: String,
  createdAt: Date,
  updatedAt: Date
});

export interface IPromotion extends mongoose.Document {
  id: number;
  title: string;
  description: string;
  discount: number;
  validityPeriod: string;
  createdAt: Date;
  updatedAt: Date;
}

const promotionSchema: Schema<IPromotion> = new Schema<IPromotion>({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  validityPeriod: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});
export const Promotion:  mongoose.Model<IPromotion> = mongoose.model<IPromotion>('Promotion', PromotionSchema);

