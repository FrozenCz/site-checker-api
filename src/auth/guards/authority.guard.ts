import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthorityEnum } from '../decorators/hasAuthority.decorator';

@Injectable()
export class AuthorityGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const authority = this.reflector.get<AuthorityEnum>(
      'HasAuthority',
      context.getHandler(),
    );

    if (!authority) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.authority) {
      return false;
    }

    return user.authorities.some((auth) => auth.tag === authority);
  }
}
