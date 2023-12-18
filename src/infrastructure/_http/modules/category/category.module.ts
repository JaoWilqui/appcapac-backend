import { CategoryController } from './controllers/category.controller';

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [CategoryController],
  providers: [],
})
export class CategoryModule {}
