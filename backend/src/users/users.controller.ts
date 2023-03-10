import { Body, Controller, Get, Post } from '@nestjs/common';
import { InsertResult } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<InsertResult> {
    try {
      console.log('signUpDto controller', signUpDto);
      return await this.usersService.createUser(signUpDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<{ accessToken: string; id: number }> {
    try {
      console.log('loginDto controller', loginDto);
      return await this.usersService.login(loginDto);
    } catch (error) {
      console.log(error);
    }
  }
}
