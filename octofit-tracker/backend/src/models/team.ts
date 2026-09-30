import mongoose, { Document, Schema, Types } from 'mongoose';

export interface TeamDocument extends Document {
  name: string;
  motto: string;
  members: Types.ObjectId[];
}

const teamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true, trim: true },
    motto: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

export const Team = mongoose.model<TeamDocument>('Team', teamSchema);