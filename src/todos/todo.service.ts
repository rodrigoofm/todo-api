import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { TodoDTO } from './dto/todo.dto';
import { Todo } from './model/todo';

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

  async isValidTodo(userId: string, taskId: string): Promise<Todo> {
    const isValidId = await this.todoModel.findOne({
      taskId: taskId,
      userId: userId,
      enable: true,
    });

    if (!isValidId) {
      throw new NotFoundException();
    }

    return isValidId;
  }

  async create(userId: string, TodoDTO: TodoDTO): Promise<Todo> {
    const createdTodo = new this.todoModel({
      ...TodoDTO,
      taskId: uuid(),
      enable: true,
      userId,
      status_history: [
        {
          status: 'PENDING',
          when: Date(),
        },
      ],
      status: 'PENDING',
    });

    return await createdTodo.save();
  }

  async findUserTodos(userId: string): Promise<Todo[]> {
    return await this.todoModel.find({ userId: userId, enable: true }).exec();
  }

  async findTodos(userId: string, taskId: string): Promise<Todo> {
    return await this.isValidTodo(userId, taskId);
  }

  async update(
    userId: string,
    taskId: string,
    todoDTO: TodoDTO,
  ): Promise<Todo> {
    await this.isValidTodo(userId, taskId);

    return await this.todoModel
      .findOneAndUpdate(
        {
          taskId: taskId,
          userId: userId,
          enable: true,
        },
        todoDTO,
        { new: true },
      )
      .exec();
  }

  async delete(userId: string, taskId: string): Promise<Todo> {
    await this.isValidTodo(userId, taskId);

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
    newStatus: string,
  ): Promise<Todo> {
    const todo = await this.isValidTodo(userId, taskId);
    const statusTodo = todo.status;

    if (statusTodo == 'COMPLETED') {
      throw new BadRequestException('Completed status cannot be changed');
    }

    if (statusTodo == 'CANCELED' && newStatus == 'COMPLETED') {
      throw new BadRequestException(
        'Cannot change canceled status to complete',
      );
    }

    if (newStatus == 'PENDING') {
      todo.status = 'PENDING';
      todo.status_history.push({
        status: 'PENDING',
        when: new Date(),
      });
    }

    return await this.todoModel
      .findByIdAndUpdate(
        {
          taskId: taskId,
          userId: userId,
          status: newStatus,
        },
        { new: true },
      )
      .exec();
  }
}
