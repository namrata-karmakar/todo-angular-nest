import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todos } from './todos.entity';

@Injectable()
export class TodosService {
  @InjectRepository(Todos)
  private todosRepository: Repository<Todos>;

  async createTodo(createTodoDto: CreateTodoDto): Promise<Todos> {
    try {
      console.log('createTodoDto service', createTodoDto);
      return this.todosRepository.save({
        description: createTodoDto.description,
        status: createTodoDto.status,
        user_id: createTodoDto.user_id,
      });
    } catch (error) {
      throw error;
    }
  }

  async getTodosByUserId(userId: number): Promise<Todos[]> {
    try {
      console.log('userId', userId);
      const todos = this.todosRepository.find({
        where: {
          user_id: userId,
        },
      });
      if (!todos) {
        throw new NotFoundException(
          `Todos for user with id ${userId} not found`,
        );
      }
      return todos;
    } catch (error) {
      throw error;
    }
  }

  async getTodoById(id: number): Promise<Todos> {
    try {
      const todo = this.todosRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!todo) {
        throw new NotFoundException(`Todo with id ${id} not found`);
      }
      return todo;
    } catch (error) {
      throw error;
    }
  }

  async updateTodoById(
    id: number,
    updateTodoDto: UpdateTodoDto,
  ): Promise<UpdateResult> {
    try {
      return this.todosRepository
        .createQueryBuilder()
        .update(Todos)
        .set({
          description: updateTodoDto.description,
          status: updateTodoDto.status,
        })
        .where('id=:id', { id })
        .execute();
    } catch (error) {
      throw error;
    }
  }

  async deleteTodoById(id: number): Promise<DeleteResult> {
    try {
      return this.todosRepository.delete({ id });
    } catch (error) {
      throw error;
    }
  }
}
