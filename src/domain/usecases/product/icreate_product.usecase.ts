import { ICreateProduct } from 'src/domain/dto/product/create_product.dto';

export interface ICreateProductUsecase {
  insertProduct(product: ICreateProduct): Promise<any>;
}
