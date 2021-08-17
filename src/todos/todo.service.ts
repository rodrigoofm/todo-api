import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Todo } from './Model/todo';

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

  async create(userId: string, todo: Todo): Promise<Todo> {
    const createdTodo = new this.todoModel({
      ...todo,
      taskId: uuid(),
      enable: true,
      userId,
      status_history: {
        status: 'PENDING',
        when: Date(),
      },
      status: 'PENDING',
    });

    return await createdTodo.save();
  }

  async findUserTodos(userId: string): Promise<Todo[]> {
    return await this.todoModel.find({ userId: userId, enable: true }).exec();
  }

  async findTodos(userId: string, taskId: string): Promise<Todo[]> {
    return await this.todoModel
      .find({ userId: userId, taskId: taskId, enable: true })
      .exec();
  }

  async update(userId: string, taskId: string, todo: Todo): Promise<Todo> {
    return await this.todoModel
      .findOneAndUpdate(
        {
          taskId: taskId,
          userId: userId,
          enable: true,
        },
        todo,
        { new: true },
      )
      .exec();
  }

  async delete(userId: string, taskId: string): Promise<Todo> {
    return await this.todoModel
      .findOneAndUpdate(
        {
          taskId: taskId,
          userId: userId,
        },
        { enable: false },
        { new: true },
      )
      .exec();
  }

  async updateStatus(
    taskId: string,
    userId: string,
    status: Todo,
  ): Promise<Todo> {
    const statusTodo = this.todoModel.findOne();

    return await this.todoModel
      .findByIdAndUpdate(
        {
          taskId: taskId,
          userId: userId,
          status: status,
        },
        { new: true },
      )
      .exec();
  }
}
