import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TodoStatus } from './todo-status.enum';

@Entity('todos')
export class Todos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  status: TodoStatus;

  @Column()
  user_id: number;
}
