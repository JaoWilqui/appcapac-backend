import { IPaginationDTO } from 'src/domain/dto/pagination.dto';
import { ICategory } from 'src/domain/entities/category.entity';

export interface IFindAllCategoryUsecase {
  findAllCategory(params: IPaginationDTO<ICategory>): Promise<IPaginationDTO<ICategory>>;
}
