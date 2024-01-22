import { ProductEntity } from 'src/infrastructure/entities/product.entity';
import { ProductController } from './controllers/product.controller';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateProductUsecase } from 'src/application/usecases/product/create_product.usecase';
import { DeleteProductUsecase } from 'src/application/usecases/product/delete_product.usecase';
import { FindAllProductUsecase } from 'src/application/usecases/product/find_all_products.usecase';
import { FindProductByIdUserUsecase } from 'src/application/usecases/product/find_product_by_id.usecase';
import { UpdateProductUsecase } from 'src/application/usecases/product/update_product.usecase';
import { IProductRepository } from 'src/domain/repositories/product.repository';
import { ProductRepository } from 'src/infrastructure/repositories/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [
    { provide: ProductRepository, useClass: ProductRepository },
    {
      provide: CreateProductUsecase,
      useFactory: (productRepository: IProductRepository) =>
        new CreateProductUsecase(productRepository),
      inject: [ProductRepository],
    },
    {
      provide: UpdateProductUsecase,
      useFactory: (productRepository: IProductRepository) =>
        new UpdateProductUsecase(productRepository),
      inject: [ProductRepository],
    },
    {
      provide: DeleteProductUsecase,
      useFactory: (productRepository: IProductRepository) =>
        new DeleteProductUsecase(productRepository),
      inject: [ProductRepository],
    },
    {
      provide: FindAllProductUsecase,
      useFactory: (productRepository: IProductRepository) =>
        new FindAllProductUsecase(productRepository),
      inject: [ProductRepository],
    },
    {
      provide: FindProductByIdUserUsecase,
      useFactory: (productRepository: IProductRepository) =>
        new FindProductByIdUserUsecase(productRepository),
      inject: [ProductRepository],
    },
  ],
})
export class ProductModule {}
