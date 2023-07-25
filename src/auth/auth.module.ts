import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { LocalStrategy } from './local.stategy';
import { PassportModule } from '@nestjs/passport';
import { AUTH } from '../../private.config';
import { AuthController } from './auth.contoller';


@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: AUTH.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, UsersService],
  exports: [AuthService],
})
export class AuthModule {}