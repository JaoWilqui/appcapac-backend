import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationDTO } from 'src/domain/dto/pagination.dto';
import { ImagesEntity } from 'src/infrastructure/entities/images.entity';

import { IImages } from 'src/domain/entities/images.entity';
import { TodoRepository } from 'src/infrastructure/repositories/_todo.repository';
import { Repository } from 'typeorm';

@Injectable()
export class ImagesRepository implements TodoRepository<ImagesEntity> {
  constructor(
    @InjectRepository(ImagesEntity)
    private readonly imagesEntityRepository: Repository<ImagesEntity>,
  ) {}

  async updateContent(id: number, images: ImagesEntity): Promise<void> {
    const imagesEntity = images;
    await this.imagesEntityRepository.update({ id: id }, imagesEntity);
  }
  async insert(images: ImagesEntity): Promise<void> {
    const imagesEntity = images;
    await this.imagesEntityRepository.save(imagesEntity);
  }
  async findAll(
    params: IPaginationDTO<ImagesEntity> & IImages,
  ): Promise<IPaginationDTO<ImagesEntity>> {
    const queryBuilder = this.imagesEntityRepository.createQueryBuilder('images');
    const paginatedData: IPaginationDTO<ImagesEntity> = new IPaginationDTO<ImagesEntity>();

    if (params?.id) {
      queryBuilder.andWhere(`images.id = :id`, { id: params.id });
    }

    if (params?.descricao) {
      queryBuilder.andWhere(`images.descricao like :descricao`, {
        descricao: `%${params.descricao}%`,
      });
    }

    if (params?.adesao) {
      queryBuilder.andWhere(`images.adesao = :adesao`, {
        adesao: params.adesao,
      });
    }

    if (params?.uf) {
      queryBuilder.andWhere(`images.uf = :uf`, {
        uf: params.uf,
      });
    }

    if (params?.cidade) {
      queryBuilder.andWhere(`images.cidade like :cidade`, { cidade: `%${params.cidade}%` });
    }

    if (params?.operator) {
      queryBuilder.andWhere(`operator.id = :operator`, { operator: params.operator });
    }

    if (params?.product) {
      queryBuilder.andWhere(`product.id = :product`, { product: params.product });
    }

    if (params?.nome) {
      queryBuilder.andWhere(`images.nome like :nome`, { nome: `%${params.descricao}%` });
    }

    if (params?.dtcadastro) {
      queryBuilder.andWhere(`images.dtcadastro >= :dtcadastro`, { dtcadastro: params.dtcadastro });
    }

    queryBuilder.leftJoinAndSelect('images.product', 'product');
    queryBuilder.leftJoinAndSelect('images.operator', 'operator');
    queryBuilder.select([
      'images.id',
      'images.nome',
      'images.imageRelativePath',
      'images.descricao',
      'images.uf',
      'images.adesao',
      'images.cidade',
      'product',
      'operator',
      'images.dtcadastro',
    ]);
    if (params?.pageCount && params?.page) {
      queryBuilder.skip(params.pageCount * (params.page - 1));
      queryBuilder.take(params.pageCount);
    }

    if (params?.order && params?.orderBy) {
      queryBuilder.orderBy('images.' + params.orderBy, params.order);
    }
    queryBuilder.execute();

    paginatedData.itemCount = await queryBuilder.getCount();
    paginatedData.data = await queryBuilder.getMany();
    return paginatedData;
  }
  async findById(id: number): Promise<ImagesEntity> {
    const queryBuilder = this.imagesEntityRepository.createQueryBuilder('images');
    // queryBuilder
    //   .leftJoinAndSelect('images.campaing', 'campaing')
    //   .addSelect(['campaing.id', 'campaing.nome', 'campaing.dtcadastro']);
    queryBuilder
      .leftJoinAndSelect('images.product', 'product')
      .addSelect(['product.id', 'product.nome', 'product.dtcadastro']);
    queryBuilder
      .leftJoinAndSelect('images.operator', 'operator')
      .addSelect(['operator.id', 'operator.nome', 'operator.dtcadastro']);
    queryBuilder.andWhere('images.id=:id', { id: id });
    queryBuilder.select([
      'images.id',
      'images.nome',
      'images.imageRelativePath',
      'images.descricao',
      'images.uf',
      'images.cidade',
      'images.adesao',
      'operator',
      'product',
      'images.dtcadastro',
    ]);
    queryBuilder.execute();
    const imagesEntity = await queryBuilder.getOne();

    return imagesEntity;
  }
  async deleteById(id: number): Promise<void> {
    await this.imagesEntityRepository.softDelete(id);
  }
}
