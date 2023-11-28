import { Schema } from 'mongoose';

export const WorkerSchema = new Schema({
  firstName: String,
  lastName: String,
});
