import { IProductRepository } from 'src/domain/repositories/product.repository';
import { IDeleteProductUsecase } from 'src/domain/usecases/product/idelete_product.usecase';

export class DeleteProductUsecase implements IDeleteProductUsecase {
  constructor(private productRepository: IProductRepository) {}
  async deleteProduct(id: number) {
    try {
      await this.productRepository.deleteById(id);
      return { status: 200, message: 'Categoria deletada com sucesso!' };
    } catch (error) {
      throw Error('Ocorreu um erro ao tentar deletar a Categoria!');
    }
  }
}
