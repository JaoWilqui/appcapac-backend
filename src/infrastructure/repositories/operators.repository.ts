import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { IPaginationDTO } from 'src/domain/dto/pagination.dto';
import { IOperator } from 'src/domain/entities/operators.entity';
import { TodoRepository } from 'src/infrastructure/repositories/_todo.repository';
import { Repository } from 'typeorm';
import { OperatorsEntity } from '../entities/operators.entity';

@Injectable()
export class OperatorsRepository implements TodoRepository<OperatorsEntity> {
  constructor(
    @InjectRepository(OperatorsEntity)
    private readonly operatorsEntityRepository: Repository<OperatorsEntity>,
  ) {}

  async updateContent(id: number, operator: OperatorsEntity): Promise<void> {
    const operatorsEntity = operator;
    await this.operatorsEntityRepository.update({ id: id }, operatorsEntity);
  }
  async insert(operator: OperatorsEntity): Promise<void> {
    const operatorsEntity = operator;
    await this.operatorsEntityRepository.insert(operatorsEntity);
  }
  async findAll(
    params: IPaginationDTO<OperatorsEntity> & IOperator,
  ): Promise<IPaginationDTO<OperatorsEntity>> {
    const queryBuilder = this.operatorsEntityRepository.createQueryBuilder('operators');
    const paginatedData: IPaginationDTO<OperatorsEntity> = new IPaginationDTO<OperatorsEntity>();

    if (params?.id) {
      queryBuilder.andWhere(`operators.id=:id`, { id: params.id });
    }

    if (params?.nome) {
      queryBuilder.andWhere(`operators.nome like :nome`, { nome: `%${params.nome}%` });
    }

    if (params?.dtcadastro) {
      queryBuilder.andWhere(`operators.dtcadastro >= :dtcadastro`, {
        dtcadastro: params.dtcadastro,
      });
    }

    queryBuilder.select(['operators.id', 'operators.nome', 'operators.dtcadastro']);
    if (params?.pageCount && params?.page) {
      queryBuilder.skip(params.pageCount * (params.page - 1));
      queryBuilder.take(params.pageCount);
    }

    if (params?.order && params?.orderBy) {
      queryBuilder.orderBy('operators.' + params.orderBy, params.order);
    }
    queryBuilder.execute();
    paginatedData.itemCount = await queryBuilder.getCount();
    paginatedData.data = await queryBuilder.getMany();
    return paginatedData;
  }
  async findById(id: number): Promise<OperatorsEntity> {
    const queryBuilder = this.operatorsEntityRepository.createQueryBuilder('operators');
    queryBuilder.andWhere('operators.id=:id', { id: id });

    queryBuilder.select(['operators.id', 'operators.nome', 'operators.dtcadastro']);
    queryBuilder.execute();
    const operatorsEntity = await queryBuilder.getOne();

    return operatorsEntity;
  }
  async deleteById(id: number): Promise<void> {
    await this.operatorsEntityRepository.softDelete(id);
  }
}
