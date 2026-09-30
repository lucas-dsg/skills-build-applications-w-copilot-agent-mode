import mongoose, { Document, Schema } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  weeklyGoal: number;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    weeklyGoal: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

export const User = mongoose.model<UserDocument>('User', userSchema);