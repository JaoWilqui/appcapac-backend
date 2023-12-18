import { ModulesController } from './controllers/modules.controller';

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ModulesController],
  providers: [],
})
export class ModulesModule {}
