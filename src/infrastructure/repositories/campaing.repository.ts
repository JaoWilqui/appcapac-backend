import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    const campaingEntity = this.campaingEntity(campaing);
    await this.campaingEntityRepository.update({ id: id }, campaingEntity);
  }
  async insert(campaing: CampaingEntity): Promise<void> {
    const campaingEntity = this.campaingEntity(campaing);
    await this.campaingEntityRepository.insert(campaingEntity);
  }
  async findAll(): Promise<CampaingEntity[]> {
    const campaingEntity = await this.campaingEntityRepository.find();
    return campaingEntity.map(campaingEntity => this.campaing(campaingEntity));
  }
  async findById(id: number): Promise<CampaingEntity> {
    const campaingEntity = await this.campaingEntityRepository.findOneBy({ id: id });
    return this.campaing(campaingEntity);
  }
  async deleteById(id: number): Promise<void> {
    await this.campaingEntityRepository.delete({ id: id });
  }

  private campaing(campaingEntity: CampaingEntity): CampaingEntity {
    const campaing: CampaingEntity = new CampaingEntity();

    campaing.id = campaingEntity.id;
    campaing.deletado = campaingEntity.deletado;
    campaing.descricao = campaingEntity.descricao;
    campaing.dtcadastro = campaingEntity.dtcadastro;
    campaing.nome = campaingEntity.nome;
    campaing.videos = campaingEntity.videos;
    campaing.images = campaingEntity.images;
    campaing.status = campaingEntity.status;
    campaing.dtinicio = campaingEntity.dtinicio;
    campaing.dtfim = campaingEntity.dtfim;

    return campaing;
  }

  private campaingEntity(campaing: CampaingEntity): CampaingEntity {
    const campaingEntity: CampaingEntity = new CampaingEntity();

    campaingEntity.id = campaing.id;
    campaingEntity.deletado = campaing.deletado;
    campaingEntity.descricao = campaing.descricao;
    campaingEntity.dtcadastro = campaing.dtcadastro;
    campaingEntity.nome = campaing.nome;
    campaingEntity.videos = campaing.videos;
    campaingEntity.images = campaing.images;
    campaingEntity.status = campaing.status;
    campaingEntity.dtinicio = campaing.dtinicio;
    campaingEntity.dtfim = campaing.dtfim;

    return campaingEntity;
  }
}
