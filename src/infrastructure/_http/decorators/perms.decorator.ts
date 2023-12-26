import { SetMetadata } from '@nestjs/common';
import { Perms } from 'src/infrastructure/enum/permissions.enum';

export const PERMS_KEY = 'perms';
export const Permissions = (...perm: Perms[]) => SetMetadata(PERMS_KEY, perm);
