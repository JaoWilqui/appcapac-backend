import { IUpdateProduct } from 'src/domain/dto/product/update_product.dto';

export interface IUpdateProductUsecase {
  updateProduct(id: number, product: IUpdateProduct): Promise<any>;
}
