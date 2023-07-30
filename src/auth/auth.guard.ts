import {
  CanActivate,
  ExecutionContext, ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AUTH } from '../../private.config';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../users/roles.decorator';
import { USER_ROLES } from '../users/entities/user.entity';
import { AccessTokenPayload } from './auth.types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<USER_ROLES[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Не авторизован');
    }

    const encodedUser = await this.jwtService.verifyAsync<AccessTokenPayload>(
      token,
      {
        secret: AUTH.ACCESS_TOKEN_SECRET,
      },
    );

    request['user'] = encodedUser;
    const haveAccess = roles.includes(encodedUser.role);

    if (!haveAccess) {
      throw new ForbiddenException('У вас нет прав на это действие');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}