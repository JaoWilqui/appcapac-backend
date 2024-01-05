import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/infrastructure/entities/user.entity';

import { IPaginationDTO } from 'src/domain/dto/pagination.dto';
import { IUser } from 'src/domain/entities/user.entity';
import { TodoRepository } from 'src/infrastructure/repositories/_todo.repository';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository implements TodoRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string): Promise<UserEntity> {
    const queryBuilder = this.userEntityRepository.createQueryBuilder('user');
    queryBuilder.leftJoinAndSelect('user.modules', 'modules').addSelect(['modules.id', 'modules.nome', 'modules.dtcadastro']);
    queryBuilder.andWhere('user.email=:email', { email: email });
    queryBuilder.andWhere('user.deletado IS NULL');
    queryBuilder.select(['user.id', 'user.nome', 'user.sobrenome', 'user.email', 'user.dtcadastro', 'user.senha', 'user.perms', 'modules']);
    queryBuilder.execute();
    const userEntity = await queryBuilder.getOne();
    return userEntity;
  }

  async updateContent(id: number, user: UserEntity): Promise<void> {
    await this.userEntityRepository.update(user);
  }
  async insert(user: UserEntity): Promise<void> {
    const userEntity = user;
    await this.userEntityRepository.save(userEntity);
  }
  async findAll(params: IPaginationDTO<UserEntity> & IUser): Promise<IPaginationDTO<UserEntity>> {
    const queryBuilder = this.userEntityRepository.createQueryBuilder('user');
    const paginatedData: IPaginationDTO<UserEntity> = new IPaginationDTO<UserEntity>();

    if (params?.id) {
      queryBuilder.andWhere(`user.id=:id`, { id: params.id });
    }

    if (params?.nome) {
      queryBuilder.andWhere(`user.nome like :nome`, { nome: `%${params.nome}%` });
    }
    if (params?.email) {
      queryBuilder.andWhere(`user.email like :email`, { email: `%${params.email}%` });
    }
    if (params?.sobrenome) {
      queryBuilder.andWhere(`user.sobrenome like :sobrenome `, { sobrenome: `%${params.sobrenome}%` });
    }
    if (params?.dtcadastro) {
      queryBuilder.andWhere(`user.dtcadastro=:dtcadastro`, { dtcadastro: params.dtcadastro });
    }

    queryBuilder.andWhere('user.deletado IS NULL');
    queryBuilder.select(['user.id', 'user.nome', 'user.sobrenome', 'user.email', 'user.dtcadastro']);

    if (params?.pageCount && params?.page) {
      queryBuilder.skip(params.pageCount * (params.page - 1));
      queryBuilder.take(params.pageCount);
    }

    if (params?.order && params?.orderBy) {
      queryBuilder.orderBy(params.orderBy, params.order);
    }
    queryBuilder.execute();
    paginatedData.itemCount = await queryBuilder.getCount();
    paginatedData.data = await queryBuilder.getMany();
    return paginatedData;
  }
  async findById(id: number): Promise<UserEntity> {
    const queryBuilder = this.userEntityRepository.createQueryBuilder('user');
    queryBuilder.leftJoinAndSelect('user.modules', 'modules').addSelect(['modules.id', 'modules.nome', 'modules.dtcadastro']);
    queryBuilder.andWhere('user.id=:id', { id: id });
    queryBuilder.andWhere('user.deletado IS NULL');
    queryBuilder.select(['user.id', 'user.nome', 'user.sobrenome', 'user.email', 'user.dtcadastro', 'user.perms', 'modules']);
    queryBuilder.execute();
    const userEntity = await queryBuilder.getOne();
    return userEntity;
  }
  async deleteById(id: number): Promise<void> {
    await this.userEntityRepository.update(id, { deletado: 'x' });
  }
}
