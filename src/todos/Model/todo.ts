import { Document } from 'mongoose';

interface IStatusHistory {
  status: string;
  when: Date;
}

export class Todo extends Document {
  taskId: string;
  userId: string;
  description: string;
  enable: boolean;
  when: Date;
  status_history: Array<IStatusHistory>;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
