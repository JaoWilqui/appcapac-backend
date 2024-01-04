import { BadRequestException } from '@nestjs/common';
import { IUpdateCategory } from 'src/domain/dto/Category/update_Category.dto';
import {} from 'src/domain/dto/user/create_user.dto';
import { ICategory } from 'src/domain/entities/Category.entity';
import { ICategoryRepository } from 'src/domain/repositories/Category.repository';
import { IUpdateCategoryUsecase } from 'src/domain/usecases/Category/iupdate_Category.usecase';

export class UpdateCategoryUsecase implements IUpdateCategoryUsecase {
  constructor(private categoryRepository: ICategoryRepository) {}
  async updateCategory(id: number, Category: IUpdateCategory) {
    try {
      const insertCategory: ICategory = Category;
      await this.categoryRepository.updateContent(id, insertCategory);
      return { status: 200, message: 'Categoria atualziada com sucesso!' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
