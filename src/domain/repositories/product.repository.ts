import { IPaginationDTO } from '../dto/pagination.dto';
import { IProduct } from '../entities/product.entity';

export interface IProductRepository {
  updateContent(id: number, category: IProduct): Promise<void>;
  insert(category: IProduct): Promise<void>;
  findAll(params?: IPaginationDTO<IProduct>): Promise<IPaginationDTO<IProduct>>;
  findById(id: number): Promise<IProduct>;
  deleteById(id: number): Promise<void>;
}
