import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationDTO } from 'src/domain/dto/pagination.dto';

import { TodoRepository } from 'src/infrastructure/repositories/_todo.repository';
import { Repository } from 'typeorm';
import { ImagesEntity } from '../entities/images.entity';

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
    await this.imagesEntityRepository.insert(imagesEntity);
  }
  async findAll(params: IPaginationDTO<ImagesEntity>): Promise<IPaginationDTO<ImagesEntity>> {
    const queryBuilder = this.imagesEntityRepository.createQueryBuilder('images');
    const paginatedData: IPaginationDTO<ImagesEntity> = new IPaginationDTO<ImagesEntity>();
    if (params?.filters) {
      Object.keys(params.filters).forEach(key => {
        if (params.filters[key]) {
          queryBuilder.andWhere(`images.${key}=:${key}`, { [key]: params.filters[key] });
        }
      });
    }
    queryBuilder.andWhere('images.deletado!=:deletado', { deletado: 'x' });
    queryBuilder.skip(params.pageCount * params.page);
    queryBuilder.take(params.pageCount);
    queryBuilder.orderBy(params.orderBy, params.order);
    paginatedData.itemCount = await queryBuilder.getCount();
    paginatedData.data = await queryBuilder.getMany();
    return paginatedData;
  }
  async findById(id: number): Promise<ImagesEntity> {
    const imagesEntity = await this.imagesEntityRepository.findOneBy({ id: id });
    return imagesEntity;
  }
  async deleteById(id: number): Promise<void> {
    await this.imagesEntityRepository.update(id, { deletado: 'x' });
  }
}
