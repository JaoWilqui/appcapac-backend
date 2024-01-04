import { SetMetadata } from '@nestjs/common';
import { ModulesEnum } from 'src/infrastructure/enum/modules.enum';

export const MODULES_KEYS = 'modules';
export const Modules = (...modules: ModulesEnum[]) => SetMetadata(MODULES_KEYS, modules);
