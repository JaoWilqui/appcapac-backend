import { IPaginationDTO } from 'src/domain/dto/pagination.dto';
import { IProduct } from 'src/domain/entities/product.entity';
import { IProductRepository } from 'src/domain/repositories/product.repository';
import { IFindAllProductUsecase } from 'src/domain/usecases/product/ifind_all_product.usecase';

export class FindAllProductUsecase implements IFindAllProductUsecase {
  constructor(private productRepository: IProductRepository) {}
  async findAllProduct(params: IPaginationDTO<IProduct> & IProduct) {
    try {
      const product = await this.productRepository.findAll(params);
      return product;
    } catch (error) {
      throw Error('Ocorreu um erro ao tentar retornar as Categorias!');
    }
  }
}
