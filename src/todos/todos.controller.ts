import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
}
