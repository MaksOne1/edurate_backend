import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AUTH } from '../../private.config';
import { Reflector } from '@nestjs/core';
import { ONLY_STAFF_KEY } from './only-staff.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const onlyStaff = this.reflector.getAllAndOverride<boolean>(ONLY_STAFF_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);


    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: AUTH.ACCESS_TOKEN_SECRET,
        },
      );
      request['user'] = payload;

      if (onlyStaff) {
          return payload.isStaff
      }
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}