import { BadRequestException } from '@nestjs/common';
import { ICreateProduct } from 'src/domain/dto/product/create_product.dto';
import { IProduct } from 'src/domain/entities/product.entity';
import { IProductRepository } from 'src/domain/repositories/product.repository';
import { ICreateProductUsecase } from 'src/domain/usecases/product/icreate_product.usecase';

export class CreateProductUsecase implements ICreateProductUsecase {
  constructor(private productRepository: IProductRepository) {}

  async insertProduct(product: ICreateProduct) {
    try {
      const createProduct: IProduct = product;

      await this.productRepository.insert(createProduct);

      return { status: 200, message: 'Categoria registrada com sucesso!' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
