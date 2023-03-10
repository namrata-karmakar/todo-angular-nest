import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todos } from './todos.entity';
import { TodosService } from './todos.service';

@Controller('todos')
@UseGuards(AuthGuard())
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Post('/')
  async createTodo(@Body() createTodoDto: CreateTodoDto): Promise<Todos> {
    try {
      console.log('createTodoDto controller', createTodoDto);
      return await this.todosService.createTodo(createTodoDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Get('userId/:userId')
  async getTodosByUserId(@Param('userId') userId: number): Promise<Todos[]> {
    try {
      const todos = await this.todosService.getTodosByUserId(userId);
      console.log('todos', todos);
      return todos;
    } catch (error) {
      console.log(error);
    }
  }

  @Get('id/:id')
  async getTodoById(@Param('id') id: number): Promise<Todos> {
    try {
      return await this.todosService.getTodoById(id);
    } catch (error) {
      console.log(error);
    }
  }

  @Put('id/:id')
  async updateTodoById(
    @Param('id') id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<UpdateResult> {
    try {
      return this.todosService.updateTodoById(id, updateTodoDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Delete('id/:id')
  async deleteTodoById(@Param('id') id: number): Promise<DeleteResult> {
    try {
      return this.todosService.deleteTodoById(id);
    } catch (error) {
      console.log(error);
    }
  }
}
