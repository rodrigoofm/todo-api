import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodoSchema } from './schemas/todo.schema';
import { TodoService } from './todo.service';
import { Todo } from './Model/todo';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
  ],
  controllers: [TodosController],
  providers: [TodoService],
})
export class TodoModule {}
