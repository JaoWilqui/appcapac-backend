import { ICreateCategory } from 'src/domain/dto/category/create_category.dto';

export interface ICreateCategoryUsecase {
  inserCategory(category: ICreateCategory): Promise<any>;
}
