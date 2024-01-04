import { BadRequestException } from '@nestjs/common';
import { ICreateCategory } from 'src/domain/dto/Category/create_Category.dto';
import { ICategory } from 'src/domain/entities/Category.entity';
import { ICategoryRepository } from 'src/domain/repositories/Category.repository';
import { ICreateCategoryUsecase } from 'src/domain/usecases/Category/icreate_Category.usecase';

export class CreateCategoryUsecase implements ICreateCategoryUsecase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async inserCategory(category: ICreateCategory) {
    try {
      const createCategory: ICategory = category;

      await this.categoryRepository.insert(createCategory);

      return { status: 200, message: 'Categoria registrada com sucesso!' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
