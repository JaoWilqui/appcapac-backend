import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationDTO } from 'src/domain/dto/pagination.dto';
import { ICampaing } from 'src/domain/entities/campaing.entity';
import { TodoRepository } from 'src/infrastructure/repositories/_todo.repository';
import { Repository } from 'typeorm';
import { CampaingEntity } from '../entities/campaing.entity';

@Injectable()
export class CampaingRepository implements TodoRepository<CampaingEntity> {
  constructor(
    @InjectRepository(CampaingEntity)
    private readonly campaingEntityRepository: Repository<CampaingEntity>,
  ) {}

  async updateContent(id: number, campaing: CampaingEntity): Promise<void> {
    const campaingEntity = campaing;
    await this.campaingEntityRepository.update({ id: id }, campaingEntity);
  }
  async insert(campaing: CampaingEntity): Promise<void> {
    const campaingEntity = campaing;
    await this.campaingEntityRepository.insert(campaingEntity);
  }
  async findAll(
    params: IPaginationDTO<CampaingEntity> & ICampaing,
  ): Promise<IPaginationDTO<CampaingEntity>> {
    const queryBuilder = this.campaingEntityRepository.createQueryBuilder('campaing');
    const paginatedData: IPaginationDTO<CampaingEntity> = new IPaginationDTO<CampaingEntity>();
    if (params?.id) {
      queryBuilder.andWhere(`campaing.id=:id`, { id: params.id });
    }

    if (params?.nome) {
      queryBuilder.andWhere(`campaing.nome like :nome`, { nome: `%${params.nome}%` });
    }

    if (params?.descricao) {
      queryBuilder.andWhere(`campaing.descricao like :descricao `, {
        descricao: `%${params.descricao}%`,
      });
    }
    if (params?.dtcadastro) {
      queryBuilder.andWhere(`campaing.dtcadastro=:dtcadastro`, { dtcadastro: params.dtcadastro });
    }

    if (params?.status) {
      queryBuilder.andWhere(`campaing.status = :status`, { dtcadastro: params.status });
    }

    if (params?.dtfim) {
      queryBuilder.andWhere(`campaing.dtfim = :dtfim`, { dtcadastro: params.dtfim });
    }

    if (params?.dtinicio) {
      queryBuilder.andWhere(`campaing.dtinicio = :dtinicio`, { dtcadastro: params.dtinicio });
    }

    queryBuilder.andWhere('campaing.deletado IS NULL');
    queryBuilder.select([
      'campaing.id',
      'campaing.nome',
      'campaing.descricao',
      'campaing.status',
      'campaing.dtinicio',
      'campaing.dtfim',
      'campaing.dtcadastro',
    ]);

    if (params?.pageCount && params?.page) {
      queryBuilder.skip(params.pageCount * (params.page - 1));
      queryBuilder.take(params.pageCount);
    }

    if (params?.order && params?.orderBy) {
      queryBuilder.orderBy(params.orderBy, params.order);
    }
    paginatedData.itemCount = await queryBuilder.getCount();
    paginatedData.data = await queryBuilder.getMany();
    return paginatedData;
  }
  async findById(id: number): Promise<CampaingEntity> {
    const queryBuilder = this.campaingEntityRepository.createQueryBuilder('campaing');
    queryBuilder.andWhere('campaing.id=:id', { id: id });
    queryBuilder.andWhere('campaing.deletado IS NULL');
    queryBuilder.select([
      'campaing.id',
      'campaing.nome',
      'campaing.descricao',
      'campaing.status',
      'campaing.dtinicio',
      'campaing.dtfim',
      'campaing.dtcadastro',
    ]);
    queryBuilder.execute();
    const campaingEntity = await queryBuilder.getOne();
    return campaingEntity;
  }
  async deleteById(id: number): Promise<void> {
    await this.campaingEntityRepository.update(id, { deletado: 'x' });
  }
}
