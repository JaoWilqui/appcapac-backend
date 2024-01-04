import { ICategory } from 'src/domain/entities/category.entity';

export interface IFindCategoryByIdUserUsecase {
  findCategoryById(id: number): Promise<ICategory>;
}
