import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Todo } from './Model/todo';

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

  async create(userId: string, todo: Todo) {
    const createdTodo = new this.todoModel({
      ...todo,
      taskId: uuid(),
      enable: true,
      userId,
      status_history: {
        status: 'PENDING',
        when: Date(),
      },
    });

    return await createdTodo.save();
  }
}
