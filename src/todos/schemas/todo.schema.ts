import * as mongoose from 'mongoose';

const StatusHistory = new mongoose.Schema({
  status: String,
  when: Date,
});

export const TodoSchema = new mongoose.Schema(
  {
    taskId: String,
    userId: String,
    description: { type: String, required: true },
    enable: Boolean,
    when: { type: Date, required: true },
    status_history: [StatusHistory],
    status: String,
  },
  { timestamps: true },
);
