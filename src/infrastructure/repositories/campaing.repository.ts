import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationDTO } from 'src/domain/dto/pagination.dto';
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
  async findAll(params: IPaginationDTO<CampaingEntity>): Promise<IPaginationDTO<CampaingEntity>> {
    const queryBuilder = this.campaingEntityRepository.createQueryBuilder('campaing');
    const paginatedData: IPaginationDTO<CampaingEntity> = new IPaginationDTO<CampaingEntity>();
    // if (params?.filters) {
    //   Object.keys(params.filters).forEach(key => {
    //     if (params.filters[key]) {
    //       queryBuilder.andWhere(`campaing.${key}=:${key}`, { [key]: params.filters[key] });
    //     }
    //   });
    // }
    queryBuilder.andWhere('campaing.deletado!=:deletado', { deletado: 'x' });
    queryBuilder.skip(params.pageCount * params.page);
    queryBuilder.take(params.pageCount);
    queryBuilder.orderBy(params.orderBy, params.order);
    paginatedData.itemCount = await queryBuilder.getCount();
    paginatedData.data = await queryBuilder.getMany();
    return paginatedData;
  }
  async findById(id: number): Promise<CampaingEntity> {
    const campaingEntity = await this.campaingEntityRepository.findOneBy({ id: id });
    return campaingEntity;
  }
  async deleteById(id: number): Promise<void> {
    await this.campaingEntityRepository.update(id, { deletado: 'x' });
  }
}
