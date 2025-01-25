import { IOTPModel } from '@/interfaces/auth.interface';
import { Document, model, Schema } from 'mongoose';

const otpSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
    required: true,
    unique: true,
  },
  expiry: {
    type: Date, // Store expiry as a Date object
    required: true,
    default: () => new Date(Date.now() + 2 * 60 * 1000), // Default expiry to 2 minutes from creation
  },
});

// Set up a TTL index on the `expiry` field
otpSchema.index({ expiry: 1 }, { expireAfterSeconds: 0 });

const otpModel = model<IOTPModel & Document>('OTPs', otpSchema);

export default otpModel;
