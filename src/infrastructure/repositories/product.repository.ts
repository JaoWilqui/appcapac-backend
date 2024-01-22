import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationDTO } from 'src/domain/dto/pagination.dto';
import { IProduct } from 'src/domain/entities/product.entity';
import { ProductEntity } from 'src/infrastructure/entities/product.entity';
import { TodoRepository } from 'src/infrastructure/repositories/_todo.repository';
import { Repository } from 'typeorm';

@Injectable()
export class ProductRepository implements TodoRepository<ProductEntity> {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productEntityRepository: Repository<ProductEntity>,
  ) {}

  async updateContent(id: number, product: ProductEntity): Promise<void> {
    const productEntity = product;
    await this.productEntityRepository.update({ id: id }, productEntity);
  }
  async insert(product: ProductEntity): Promise<void> {
    const productEntity = product;
    await this.productEntityRepository.insert(productEntity);
  }
  async findAll(
    params: IPaginationDTO<ProductEntity> & IProduct,
  ): Promise<IPaginationDTO<ProductEntity>> {
    const queryBuilder = this.productEntityRepository.createQueryBuilder('product');
    const paginatedData: IPaginationDTO<ProductEntity> = new IPaginationDTO<ProductEntity>();

    if (params?.id) {
      queryBuilder.andWhere(`product.id=:id`, { id: params.id });
    }

    if (params?.nome) {
      queryBuilder.andWhere(`product.nome like :nome`, { nome: `%${params.nome}%` });
    }

    if (params?.descricao) {
      queryBuilder.andWhere(`product.descricao like :descricao `, {
        descricao: `%${params.descricao}%`,
      });
    }
    if (params?.dtcadastro) {
      queryBuilder.andWhere(`product.dtcadastro >= :dtcadastro`, {
        dtcadastro: params.dtcadastro,
      });
    }

    queryBuilder.select(['product.id', 'product.nome', 'product.descricao', 'product.dtcadastro']);
    if (params?.pageCount && params?.page) {
      queryBuilder.skip(params.pageCount * (params.page - 1));
      queryBuilder.take(params.pageCount);
    }

    if (params?.order && params?.orderBy) {
      queryBuilder.orderBy('product.' + params.orderBy, params.order);
    }
    queryBuilder.execute();
    paginatedData.itemCount = await queryBuilder.getCount();
    paginatedData.data = await queryBuilder.getMany();
    return paginatedData;
  }
  async findById(id: number): Promise<ProductEntity> {
    const queryBuilder = this.productEntityRepository.createQueryBuilder('product');
    queryBuilder.andWhere('product.id=:id', { id: id });

    queryBuilder.select(['product.id', 'product.nome', 'product.descricao', 'product.dtcadastro']);
    queryBuilder.execute();
    const productEntity = await queryBuilder.getOne();

    return productEntity;
  }
  async deleteById(id: number): Promise<void> {
    await this.productEntityRepository.softDelete(id);
  }
}
