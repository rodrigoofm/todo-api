import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Todo } from './Model/todo';
import { TodoService } from './todo.service';

@Controller()
export class TodosController {
  constructor(private todosService: TodoService) {}

  @Post('/users/:userId/todos')
  async create(@Param('userId') userId: string, @Body() todo: Todo) {
    return this.todosService.create(userId, todo);
  }

  @Get('/users/:userId/todos')
  async findUserTodos(@Param('userId') userId: string) {
    return this.todosService.findUserTodos(userId);
  }

  @Get('/users/:userId/:taskId/todos')
  async findTodo(
    @Param('userId') userId: string,
    @Param('taskId') taskId: string,
  ) {
    return this.todosService.findTodos(userId, taskId);
  }

  @Put('/users/:userId/:taskId/todos')
  async update(
    @Param('userId') userId: string,
    @Param('taskId') taskId: string,
    @Body() todo: Todo,
  ) {
    return await this.todosService.update(userId, taskId, todo);
  }
  @Delete('/users/:userId/:taskId/todos')
  async delete(
    @Param('userId') userId: string,
    @Param('taskId') taskId: string,
  ) {
    return await this.todosService.delete(userId, taskId);
  }

  @Put('/users/:userId/:taskId/todos')
  async updateStatus(
    @Param('userId') userId: string,
    @Param('taskId') taskId: string,
    @Body() status_history: Todo,
  ) {
    return await this.todosService.updateStatus(userId, taskId, status_history);
  }
}
