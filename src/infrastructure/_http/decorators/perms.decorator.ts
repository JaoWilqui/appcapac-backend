import { Reflector } from '@nestjs/core';
import { Perms } from 'src/infrastructure/enum/permissions.enum';

export const PERMS_KEY = 'perms';
export const Permissions = Reflector.createDecorator<Perms[]>();
