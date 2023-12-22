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
    const userEntity = user;
    await this.userEntityRepository.update({ id: id }, userEntity);
  }
  async insert(user: UserEntity): Promise<void> {
    const userEntity = user;
    await this.userEntityRepository.insert(userEntity);
  }
  async findAll(): Promise<UserEntity[]> {
    const userEntity = await this.userEntityRepository.find();
    return userEntity.map(userEntity => {
      if (!userEntity.deletado) {
        return userEntity;
      }
    });
  }
  async findById(id: number): Promise<UserEntity> {
    const userEntity = await this.userEntityRepository.findOneBy({ id: id });
    if (userEntity.deletado) {
      return null;
    }
    return userEntity;
  }
  async deleteById(id: number): Promise<void> {
    await this.userEntityRepository.update(id, { deletado: 'x' });
  }
}
