import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    const accessEntity = this.accessEntity(access);
    await this.accessEntityRepository.update({ id: id }, accessEntity);
  }
  async insert(access: AccessEntity): Promise<void> {
    const accessEntity = this.accessEntity(access);
    await this.accessEntityRepository.insert(accessEntity);
  }
  async findAll(): Promise<AccessEntity[]> {
    const accessEntity = await this.accessEntityRepository.find();
    return accessEntity.map(accessEntity => this.access(accessEntity));
  }
  async findById(id: number): Promise<AccessEntity> {
    const accessEntity = await this.accessEntityRepository.findOneBy({ id: id });
    return this.access(accessEntity);
  }
  async deleteById(id: number): Promise<void> {
    await this.accessEntityRepository.delete({ id: id });
  }

  private access(accessEntity: AccessEntity): AccessEntity {
    const access: AccessEntity = new AccessEntity();

    access.id = accessEntity.id;
    access.dtcadastro = accessEntity.dtcadastro;
    access.modulo = accessEntity.modulo;
    access.user = accessEntity.user;

    return access;
  }

  private accessEntity(access: AccessEntity): AccessEntity {
    const accessEntity: AccessEntity = new AccessEntity();

    accessEntity.id = access.id;
    accessEntity.dtcadastro = access.dtcadastro;
    accessEntity.modulo = access.modulo;
    accessEntity.user = access.user;

    return accessEntity;
  }
}
