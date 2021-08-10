import * as mongoose from 'mongoose';
// import { v4 as uuidV4 } from 'uuid';

export const TodoSchema = new mongoose.Schema(
  {
    taskId: String,
    userId: String,
    description: { type: String, requered: true },
    enable: Boolean,
    when: { type: Date, requered: true },
    status_history: Array,
  },
  { timestamps: true },
);
