import { ICreateCategory } from 'src/domain/dto/category/create_category.dto';

export interface ICreateCategoryUsecase {
  insertCategory(category: ICreateCategory): Promise<any>;
}
