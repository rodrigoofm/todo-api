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
}
