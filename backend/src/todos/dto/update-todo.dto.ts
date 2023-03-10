import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TodoStatus } from '../todo-status.enum';

export class UpdateTodoDto {
  @ApiProperty({
    description: 'The todo description',
    minimum: 3,
    maximum: 30,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  description: string;

  @ApiProperty({
    description: 'The status of the todo',
    minimum: 3,
    maximum: 100,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  status: TodoStatus;
}
