import { Module } from '@nestjs/common';
import { TodoModule } from './todos/todo.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/todo', {
      useFindAndModify: false,
    }),
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
