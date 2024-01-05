import { BadRequestException } from '@nestjs/common';
import { ICreateCategory } from 'src/domain/dto/category/create_category.dto';
import { ICategory } from 'src/domain/entities/category.entity';
import { ICategoryRepository } from 'src/domain/repositories/category.repository';
import { ICreateCategoryUsecase } from 'src/domain/usecases/category/icreate_category.usecase';

export class CreateCategoryUsecase implements ICreateCategoryUsecase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async insertCategory(category: ICreateCategory) {
    try {
      const createCategory: ICategory = category;

      await this.categoryRepository.insert(createCategory);

      return { status: 200, message: 'Categoria registrada com sucesso!' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
