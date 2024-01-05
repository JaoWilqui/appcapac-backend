import { IPaginationDTO } from 'src/domain/dto/pagination.dto';
import { ICategory } from 'src/domain/entities/category.entity';
import { ICategoryRepository } from 'src/domain/repositories/category.repository';
import { IFindAllCategoryUsecase } from 'src/domain/usecases/category/ifind_all_category.usecase';

export class FindAllCategoryUsecase implements IFindAllCategoryUsecase {
  constructor(private categoryRepository: ICategoryRepository) {}
  async findAllCategory(params: IPaginationDTO<ICategory> & ICategory) {
    try {
      const category = await this.categoryRepository.findAll(params);
      return category;
    } catch (error) {
      throw Error('Ocorreu um erro ao tentar retornar as Categorias!');
    }
  }
}
