import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ) {
  }

  async validateUser(email, password) {
    const { password: userPassword, ...user } = await this.usersService.findOneBy({
      where: { email },
      select: ['id', 'email', 'password', 'isStaff']
    });

    const passwordValid = await bcrypt.compare(password, userPassword);

    if (!passwordValid) {
      throw new UnauthorizedException("Введен неправильный пароль");
    }

    return {
      ...user,
      accessToken: await this.generateAccessToken(user)
    }
  }

  async generateAccessToken(user) {
    const payload = { sub: user.id, email: user.email, isStaff: user.isStaff };

    return this.jwtService.signAsync(payload)
  }

  async singUp(dto: CreateUserDto) {
    const user = await this.usersService.create(dto)

    return {
      ...user,
      accessToken: await this.generateAccessToken(user),
    };
  }

  async login(dto: LoginUserDto) {
    return await this.validateUser(dto.email, dto.password);
  }
}