import { Schema, Document } from 'mongoose';
import { Role } from 'src/roles/models/schema/role.schema';
import { Worker } from 'src/workers/models/shemas/workers.shema';

export interface Log extends Document {
  name: string;
  old_role: Role['_id'];
  new_role: Role['_id'];
  old_boss: Worker['_id'];
  new_boss: Worker['_id'] | null;
  created_at: string;
}

export const LogSchema = new Schema<Log>({
  name: String,
  old_role: { type: Schema.Types.ObjectId, ref: 'Role' },
  new_role: { type: Schema.Types.ObjectId, ref: 'Role' },
  old_boss: { type: Schema.Types.ObjectId, ref: 'Worker' },
  new_boss: { type: Schema.Types.ObjectId, ref: 'Worker' },
  created_at: String,
});
