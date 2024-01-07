import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationDTO } from 'src/domain/dto/pagination.dto';
import { TodoRepository } from 'src/infrastructure/repositories/_todo.repository';
import { Repository } from 'typeorm';
import { AccessEntity } from '../entities/access.entity';

@Injectable()
export class AccessRepository implements TodoRepository<AccessEntity> {
  constructor(
    @InjectRepository(AccessEntity)
    private readonly accessEntityRepository: Repository<AccessEntity>,
  ) {}

  async updateContent(id: number, access: AccessEntity): Promise<void> {
    const accessEntity = access;
    await this.accessEntityRepository.update({ id: id }, accessEntity);
  }
  async insert(access: AccessEntity): Promise<void> {
    const accessEntity = access;
    await this.accessEntityRepository.insert(accessEntity);
  }
  async findAll(params: IPaginationDTO<AccessEntity>): Promise<IPaginationDTO<AccessEntity>> {
    const queryBuilder = this.accessEntityRepository.createQueryBuilder('access');
    const paginatedData: IPaginationDTO<AccessEntity> = new IPaginationDTO<AccessEntity>();

    queryBuilder.skip(params.pageCount * params.page);
    queryBuilder.take(params.pageCount);
    queryBuilder.orderBy(params.orderBy, params.order);
    paginatedData.itemCount = await queryBuilder.getCount();
    paginatedData.data = await queryBuilder.getMany();
    return paginatedData;
  }
  async findById(id: number): Promise<AccessEntity> {
    const accessEntity = await this.accessEntityRepository.findOneBy({ id: id });
    return accessEntity;
  }
  async deleteById(id: number): Promise<void> {
    await this.accessEntityRepository.delete({ id: id });
  }
}
