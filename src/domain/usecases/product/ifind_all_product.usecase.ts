import { IPaginationDTO } from 'src/domain/dto/pagination.dto';
import { IProduct } from 'src/domain/entities/product.entity';

export interface IFindAllProductUsecase {
  findAllProduct(params: IPaginationDTO<IProduct>): Promise<IPaginationDTO<IProduct>>;
}
