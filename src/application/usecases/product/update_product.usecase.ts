import { BadRequestException } from '@nestjs/common';
import { IUpdateProduct } from 'src/domain/dto/product/update_product.dto';
import {} from 'src/domain/dto/user/create_user.dto';
import { IProduct } from 'src/domain/entities/product.entity';
import { IProductRepository } from 'src/domain/repositories/product.repository';
import { IUpdateProductUsecase } from 'src/domain/usecases/product/iupdate_product.usecase';

export class UpdateProductUsecase implements IUpdateProductUsecase {
  constructor(private productRepository: IProductRepository) {}
  async updateProduct(id: number, Product: IUpdateProduct) {
    try {
      const insertProduct: IProduct = Product;
      await this.productRepository.updateContent(id, insertProduct);
      return { status: 200, message: 'Categoria atualziada com sucesso!' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
