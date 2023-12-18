import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TodoRepository } from 'src/infrastructure/repositories/_todo.repository';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

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
    const userEntity = this.userEntity(user);
    await this.userEntityRepository.update({ id: id }, userEntity);
  }
  async insert(user: UserEntity): Promise<void> {
    const userEntity = this.userEntity(user);
    await this.userEntityRepository.insert(userEntity);
  }
  async findAll(): Promise<UserEntity[]> {
    const userEntity = await this.userEntityRepository.find();
    return userEntity.map(userEntity => this.user(userEntity));
  }
  async findById(id: number): Promise<UserEntity> {
    const userEntity = await this.userEntityRepository.findOneBy({ id: id });
    return this.user(userEntity);
  }
  async deleteById(id: number): Promise<void> {
    await this.userEntityRepository.delete({ id: id });
  }

  private user(userEntity: UserEntity): UserEntity {
    const user: UserEntity = new UserEntity();

    user.id = userEntity.id;
    user.deletado = userEntity.deletado;
    user.dtcadastro = userEntity.dtcadastro;
    user.nome = userEntity.nome;
    user.email = userEntity.email;
    user.senha = userEntity.senha;
    user.sobrenome = userEntity.sobrenome;

    return user;
  }

  private userEntity(user: UserEntity): UserEntity {
    const userEntity: UserEntity = new UserEntity();

    userEntity.id = user.id;
    userEntity.deletado = user.deletado;
    userEntity.dtcadastro = user.dtcadastro;
    userEntity.nome = user.nome;
    userEntity.email = user.email;
    userEntity.senha = user.senha;
    userEntity.sobrenome = user.sobrenome;
    return userEntity;
  }
}
