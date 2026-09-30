import mongoose, { Document, Schema } from 'mongoose';

export interface WorkoutDocument extends Document {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  focus: string;
}

const workoutSchema = new Schema<WorkoutDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    focus: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export const Workout = mongoose.model<WorkoutDocument>('Workout', workoutSchema);