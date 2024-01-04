import { ICategoryRepository } from 'src/domain/repositories/Category.repository';
import { IFindCategoryByIdUserUsecase } from 'src/domain/usecases/Category/ifind_Category_by_id.usecase';

export class FindCategoryByIdUserUsecase implements IFindCategoryByIdUserUsecase {
  constructor(private categoryRepository: ICategoryRepository) {}
  async findCategoryById(id: number) {
    try {
      const video = await this.categoryRepository.findById(id);
      return video;
    } catch (error) {
      throw Error('Ocorreu um erro ao tentar retornar a Categoria!');
    }
  }
}
