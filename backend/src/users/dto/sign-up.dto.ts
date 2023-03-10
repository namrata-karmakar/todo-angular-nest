import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsString,
  IsEmail,
  IsStrongPassword,
} from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    description: 'User name',
    minimum: 3,
    maximum: 30,
  })
  @IsNotEmpty()
  @IsEmail()
  @MinLength(3)
  @MaxLength(30)
  username: string;

  @ApiProperty({
    description: 'User Password',
    minimum: 8,
    maximum: 100,
  })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  @MinLength(8)
  @MaxLength(100)
  password: string;
}
