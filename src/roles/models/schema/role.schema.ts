import { Schema, Document } from 'mongoose';

export interface Role extends Document {
  name: string;
  created_at: string;
}

export const RoleSchema = new Schema<Role>({
  name: String,
  created_at: String,
});
