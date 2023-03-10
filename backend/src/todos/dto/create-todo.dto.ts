import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsString,
  IsNumber,
} from 'class-validator';
import { TodoStatus } from '../todo-status.enum';

export class CreateTodoDto {
  @ApiProperty({
    description: 'The todo description',
    minimum: 3,
    maximum: 30,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  description: string;

  @ApiProperty({
    description: 'The status of the todo',
    minimum: 3,
    maximum: 100,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  status: TodoStatus;

  @ApiProperty({
    description: 'The user ID of the user who created this todo',
  })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}
