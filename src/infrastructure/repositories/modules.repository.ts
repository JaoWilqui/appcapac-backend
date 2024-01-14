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
    const paginatedData: IPaginationDTO<ModulesEntity> = new IPaginationDTO<ModulesEntity>();

    paginatedData.data = await this.modulesEntityRepository.find();

    return paginatedData;
  }
  async findById(id: number): Promise<ModulesEntity> {
    const modulesEntity = await this.modulesEntityRepository.findOneBy({ id: id });
    return modulesEntity;
  }
  async deleteById(id: number): Promise<void> {
    await this.modulesEntityRepository.softDelete(id);
  }
}
