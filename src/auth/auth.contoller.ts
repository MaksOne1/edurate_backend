import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() dto: CreateUserDto) {
    return this.authService.singUp(dto);
  }

  @Post('/login')
  async login(@Body() dto: LoginUserDto) {
    return this.authService.login(dto);
  }

}
