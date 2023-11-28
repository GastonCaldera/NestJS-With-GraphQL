import { Schema, Document } from 'mongoose';
import { Role } from 'src/roles/models/schema/role.schema';

export interface Worker extends Document {
  firstName: string;
  lastName: string;
  email: string;
  role: Role['_id'];
  version: number;
  boss: Worker['_id'] | null;
}

export const WorkerSchema = new Schema<Worker>({
  firstName: String,
  lastName: String,
  email: String,
  role: { type: Schema.Types.ObjectId, ref: 'Role', default: null },
  version: Number,
  boss: {
    type: Schema.Types.ObjectId,
    ref: 'Worker',
    default: null,
  },
});
