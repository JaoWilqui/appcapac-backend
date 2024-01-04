import { IPaginationDTO } from '../dto/pagination.dto';
import { ICategory } from '../entities/category.entity';

export interface ICategoryRepository {
  updateContent(id: number, category: ICategory): Promise<void>;
  insert(category: ICategory): Promise<void>;
  findAll(params?: IPaginationDTO<ICategory>): Promise<IPaginationDTO<ICategory>>;
  findById(id: number): Promise<ICategory>;
  deleteById(id: number): Promise<void>;
}
