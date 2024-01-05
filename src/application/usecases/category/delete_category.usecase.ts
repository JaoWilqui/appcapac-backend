import { ICategoryRepository } from 'src/domain/repositories/category.repository';
import { IDeleteCategoryUsecase } from 'src/domain/usecases/category/idelete_category.usecase';

export class DeleteCategoryUsecase implements IDeleteCategoryUsecase {
  constructor(private categoryRepository: ICategoryRepository) {}
  async deleteCategory(id: number) {
    try {
      await this.categoryRepository.deleteById(id);
      return { status: 200, message: 'Categoria deletada com sucesso!' };
    } catch (error) {
      throw Error('Ocorreu um erro ao tentar deletar a Categoria!');
    }
  }
}
