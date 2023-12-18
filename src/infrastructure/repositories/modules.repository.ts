import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

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
    const modulesEntity = this.modulesEntity(modules);
    await this.modulesEntityRepository.update({ id: id }, modulesEntity);
  }
  async insert(modules: ModulesEntity): Promise<void> {
    const modulesEntity = this.modulesEntity(modules);
    await this.modulesEntityRepository.insert(modulesEntity);
  }
  async findAll(): Promise<ModulesEntity[]> {
    const modulesEntity = await this.modulesEntityRepository.find();
    return modulesEntity.map(modulesEntity => this.modules(modulesEntity));
  }
  async findById(id: number): Promise<ModulesEntity> {
    const modulesEntity = await this.modulesEntityRepository.findOneBy({ id: id });
    return this.modules(modulesEntity);
  }
  async deleteById(id: number): Promise<void> {
    await this.modulesEntityRepository.delete({ id: id });
  }

  private modules(modulesEntity: ModulesEntity): ModulesEntity {
    const modules: ModulesEntity = new ModulesEntity();

    modules.id = modulesEntity.id;
    modules.deletado = modulesEntity.deletado;
    modules.nome = modulesEntity.nome;
    modules.access = modulesEntity.access;
    modules.arquivos = modulesEntity.arquivos;
    modules.images = modulesEntity.images;
    modules.videos = modulesEntity.videos;
    modules.dtcadastros = modulesEntity.dtcadastros;

    return modules;
  }

  private modulesEntity(modules: ModulesEntity): ModulesEntity {
    const modulesEntity: ModulesEntity = new ModulesEntity();

    modulesEntity.id = modules.id;
    modulesEntity.deletado = modules.deletado;
    modulesEntity.nome = modules.nome;
    modulesEntity.access = modules.access;
    modulesEntity.arquivos = modules.arquivos;
    modulesEntity.images = modules.images;
    modulesEntity.videos = modules.videos;
    modulesEntity.dtcadastros = modules.dtcadastros;
    return modulesEntity;
  }
}
