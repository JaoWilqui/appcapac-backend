import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/infrastructure/entities/user.entity';

import { IPaginationDTO } from 'src/domain/dto/pagination.dto';
import { TodoRepository } from 'src/infrastructure/repositories/_todo.repository';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository implements TodoRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.userEntityRepository.findOneBy({ email });
  }

  async updateContent(id: number, user: UserEntity): Promise<void> {
    const userEntity = user;
    await this.userEntityRepository.update({ id: id }, userEntity);
  }
  async insert(user: UserEntity): Promise<void> {
    const userEntity = user;
    await this.userEntityRepository.insert(userEntity);
  }
  async findAll(params: IPaginationDTO<UserEntity>): Promise<IPaginationDTO<UserEntity>> {
    const queryBuilder = this.userEntityRepository.createQueryBuilder('user');
    const paginatedData: IPaginationDTO<UserEntity> = new IPaginationDTO<UserEntity>();

    if (params.filters.id) {
      queryBuilder.andWhere(`user.id=:id`, { id: params.filters.id });
    }

    if (params.filters.nome) {
      queryBuilder.andWhere(`user.nome ILIKE %:nome%`, { nome: params.filters.nome });
    }
    if (params.filters.email) {
      queryBuilder.andWhere(`user.email ILIKE %:email%`, { email: params.filters.email });
    }
    if (params.filters.sobrenome) {
      queryBuilder.andWhere(`user.sobrenome ILIKE %:sobrenome% `, { sobrenome: params.filters.sobrenome });
    }
    if (params.filters.dtcadastro) {
      queryBuilder.andWhere(`user.dtcadastro=:dtcadastro`, { dtcadastro: params.filters.dtcadastro });
    }

    queryBuilder.andWhere('user.deletado!=:deletado', { deletado: 'x' });
    queryBuilder.select(['user.id', 'user.nome', 'user.sobrenome', 'user.email', 'user.dtcadastro']);
    queryBuilder.skip(params.pageCount * (params.page - 1));
    queryBuilder.take(params.pageCount);
    queryBuilder.orderBy(params.orderBy, params.order);
    queryBuilder.execute();
    paginatedData.itemCount = await queryBuilder.getCount();
    paginatedData.data = await queryBuilder.getMany();
    return paginatedData;
  }
  async findById(id: number): Promise<UserEntity> {
    const queryBuilder = await this.userEntityRepository.createQueryBuilder('user');
    queryBuilder.andWhere('user.id=:id', { id: id });
    queryBuilder.andWhere('user.deletado!=:deletado', { deletado: 'x' });
    queryBuilder.select(['user.id', 'user.nome', 'user.sobrenome', 'user.email', 'user.dtcadastro']);
    queryBuilder.execute();
    const userEntity = await queryBuilder.getOne();
    return userEntity;
  }
  async deleteById(id: number): Promise<void> {
    await this.userEntityRepository.update(id, { deletado: 'x' });
  }
}
