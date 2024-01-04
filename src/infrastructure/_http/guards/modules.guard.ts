import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IModules } from 'src/domain/entities/modules.entity';
import { ModulesEnum } from 'src/infrastructure/enum/modules.enum';
import { MODULES_KEYS } from '../decorators/modules.decorator';

@Injectable()
export class ModulesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredModules = this.reflector.getAllAndOverride<ModulesEnum[]>(MODULES_KEYS, [context.getHandler(), context.getClass()]);
    if (!requiredModules) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return this.matchModules(requiredModules, user.modules);
  }

  matchModules(requiredModules: ModulesEnum[], modules: IModules[]) {
    const modulesNames: ModulesEnum[] = [];
    modules.forEach(module => {
      modulesNames.push(ModulesEnum[module.nome]);
    });

    let result = false;

    modulesNames.find(module => {
      if (requiredModules.includes(module)) {
        result = true;
      }
    });
    return result;
  }
}
