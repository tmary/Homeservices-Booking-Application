import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export const BookingSchema = new mongoose.Schema({
  serviceId: Number,
  name: String,
  date: Date,
  time: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  
});

export interface IBooking extends mongoose.Document {
  serviceId: number;
  name: string;
  date: Date;
  time: string;
  
}

const bookingSchema: Schema<IBooking> = new Schema<IBooking>({
    serviceId: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
    }
  });
  
  
  //const Booking = mongoose.model('Booking', bookingSchema);
  export const Booking:  mongoose.Model<IBooking> = mongoose.model<IBooking>('Booking', BookingSchema);

  //module.exports = Booking;