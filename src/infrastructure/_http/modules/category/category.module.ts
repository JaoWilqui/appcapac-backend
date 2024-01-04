import { CategoryEntity } from 'src/infrastructure/entities/category.entity';
import { CategoryController } from './controllers/category.controller';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCategoryUsecase } from 'src/application/usecases/category/create_category.usecase';
import { DeleteCategoryUsecase } from 'src/application/usecases/category/delete_category.usecase';
import { FindAllCategoryUsecase } from 'src/application/usecases/category/find_all_categorys.usecase';
import { FindCategoryByIdUserUsecase } from 'src/application/usecases/category/find_category_by_id.usecase';
import { UpdateCategoryUsecase } from 'src/application/usecases/category/update_category.usecase';
import { ICategoryRepository } from 'src/domain/repositories/Category.repository';
import { CategoryRepository } from 'src/infrastructure/repositories/category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoryController],
  providers: [
    { provide: CategoryRepository, useClass: CategoryRepository },
    {
      provide: CreateCategoryUsecase,
      useFactory: (categoryRepository: ICategoryRepository) => new CreateCategoryUsecase(categoryRepository),
      inject: [CategoryRepository],
    },
    {
      provide: UpdateCategoryUsecase,
      useFactory: (categoryRepository: ICategoryRepository) => new UpdateCategoryUsecase(categoryRepository),
      inject: [CategoryRepository],
    },
    {
      provide: DeleteCategoryUsecase,
      useFactory: (categoryRepository: ICategoryRepository) => new DeleteCategoryUsecase(categoryRepository),
      inject: [CategoryRepository],
    },
    {
      provide: FindAllCategoryUsecase,
      useFactory: (categoryRepository: ICategoryRepository) => new FindAllCategoryUsecase(categoryRepository),
      inject: [CategoryRepository],
    },
    {
      provide: FindCategoryByIdUserUsecase,
      useFactory: (categoryRepository: ICategoryRepository) => new FindCategoryByIdUserUsecase(categoryRepository),
      inject: [CategoryRepository],
    },
  ],
})
export class CategoryModule {}
