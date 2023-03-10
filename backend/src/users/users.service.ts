import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Users } from './users.entity';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class UsersService {
  @InjectRepository(Users)
  private userRepository: Repository<Users>;

  constructor(private jwtService: JwtService) {}

  async createUser(signUpDto: SignUpDto): Promise<InsertResult> {
    console.log('signUpDto service', signUpDto);
    const { username, password } = signUpDto;
    try {
      const encryptedPassword = await bcrypt.hash(password, 10);
      console.log('encryptedPassword', encryptedPassword);
      return this.userRepository.insert({
        username: username,
        password: encryptedPassword,
      });
    } catch (error) {
      throw error;
    }
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; id: number }> {
    console.log('loginDto service', loginDto);
    const { username, password } = loginDto;
    try {
      const user = await this.userRepository.findOne({
        where: {
          username: username,
        },
      });
      if (user && (await bcrypt.compare(password, user.password))) {
        const payload: JwtPayload = { username };
        const accessToken: string = await this.jwtService.sign(payload);
        const { id } = user;
        return { accessToken, id };
      } else {
        throw new UnauthorizedException('Please check your login credentials');
      }
    } catch (error) {
      throw error;
    }
  }
}
