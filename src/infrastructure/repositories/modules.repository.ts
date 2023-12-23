import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { IPaginationDTO } from 'src/domain/dto/pagination.dto';
import { TodoRepository } from 'src/infrastructure/repositories/_todo.repository';
import { Repository } from 'typeorm';
import { ModulesEntity } from '../entities/modules.entity';

@Injectable()
export class ModulesRepository implements TodoRepository<ModulesEntity> {
  constructor(
    @InjectRepository(ModulesEntity)
    private readonly modulesEntityRepository: Repository<ModulesEntity>,
  ) {}

  async updateContent(id: number, modules: ModulesEntity): Promise<void> {
    const modulesEntity = modules;
    await this.modulesEntityRepository.update({ id: id }, modulesEntity);
  }
  async insert(modules: ModulesEntity): Promise<void> {
    const modulesEntity = modules;
    await this.modulesEntityRepository.insert(modulesEntity);
  }
  async findAll(params: IPaginationDTO<ModulesEntity>): Promise<IPaginationDTO<ModulesEntity>> {
    const queryBuilder = this.modulesEntityRepository.createQueryBuilder('modules');
    const paginatedData: IPaginationDTO<ModulesEntity> = new IPaginationDTO<ModulesEntity>();
    if (params?.filters) {
      Object.keys(params.filters).forEach(key => {
        if (params.filters[key]) {
          queryBuilder.andWhere(`modules.${key}=:${key}`, { [key]: params.filters[key] });
        }
      });
    }
    queryBuilder.andWhere('modules.deletado!=:deletado', { deletado: 'x' });
    queryBuilder.skip(params.pageCount * params.page);
    queryBuilder.take(params.pageCount);
    queryBuilder.orderBy(params.orderBy, params.order);
    paginatedData.itemCount = await queryBuilder.getCount();
    paginatedData.data = await queryBuilder.getMany();
    return paginatedData;
  }
  async findById(id: number): Promise<ModulesEntity> {
    const modulesEntity = await this.modulesEntityRepository.findOneBy({ id: id });
    return modulesEntity;
  }
  async deleteById(id: number): Promise<void> {
    await this.modulesEntityRepository.update(id, { deletado: 'x' });
  }
}
