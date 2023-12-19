import { SetMetadata } from '@nestjs/common';
import { Perms } from '../../enum/permissions.enum';

export const PERMS_KEY = 'perms';
export const Permissions = (...perms: Perms[]) => SetMetadata(PERMS_KEY, perms);
