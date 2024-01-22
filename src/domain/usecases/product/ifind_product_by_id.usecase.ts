import { IProduct } from 'src/domain/entities/product.entity';

export interface IFindProductByIdUserUsecase {
  findProductById(id: number): Promise<IProduct>;
}
