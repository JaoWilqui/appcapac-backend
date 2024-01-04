import { IUpdateCategory } from 'src/domain/dto/category/update_category.dto';

export interface IUpdateCategoryUsecase {
  updateCategory(id: number, category: IUpdateCategory): Promise<any>;
}
