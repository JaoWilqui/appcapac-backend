import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Perms } from '../../enum/permissions.enum';
import { PERMS_KEY } from '../decorators/perms.decorator';

@Injectable()
export class PermsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Perms[]>(PERMS_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredRoles) {
      return true;
    }
    console.log(context);
    const { user } = context.switchToHttp().getRequest();
    return this.matchPerms(requiredRoles, user.perms);
  }

  matchPerms(perms: Perms[], perm: Perms) {
    return perms.includes(perm);
  }
}
