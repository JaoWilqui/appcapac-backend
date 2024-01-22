import { IProductRepository } from 'src/domain/repositories/product.repository';
import { IFindProductByIdUserUsecase } from 'src/domain/usecases/product/ifind_product_by_id.usecase';

export class FindProductByIdUserUsecase implements IFindProductByIdUserUsecase {
  constructor(private productRepository: IProductRepository) {}
  async findProductById(id: number) {
    try {
      const video = await this.productRepository.findById(id);
      return video;
    } catch (error) {
      throw Error('Ocorreu um erro ao tentar retornar a Categoria!');
    }
  }
}
