import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationDTO } from 'src/domain/dto/pagination.dto';
import { IVideos } from 'src/domain/entities/videos.entity';
import { TodoRepository } from 'src/infrastructure/repositories/_todo.repository';
import { Repository } from 'typeorm';
import { VideosEntity } from '../entities/videos.entity';

@Injectable()
export class VideosRepository implements TodoRepository<VideosEntity> {
  constructor(
    @InjectRepository(VideosEntity)
    private readonly videosEntityRepository: Repository<VideosEntity>,
  ) {}

  async updateContent(id: number, videos: VideosEntity): Promise<void> {
    const videosEntity = videos;
    await this.videosEntityRepository.update({ id: id }, videosEntity);
  }
  async insert(videos: VideosEntity): Promise<void> {
    const videosEntity = videos;
    await this.videosEntityRepository.save(videosEntity);
  }
  async findAll(
    params: IPaginationDTO<VideosEntity> & IVideos,
  ): Promise<IPaginationDTO<VideosEntity>> {
    const queryBuilder = this.videosEntityRepository.createQueryBuilder('videos');
    const paginatedData: IPaginationDTO<VideosEntity> = new IPaginationDTO<VideosEntity>();

    if (params?.id) {
      queryBuilder.andWhere(`videos.id=:id`, { id: params.id });
    }

    if (params?.descricao) {
      queryBuilder.andWhere(`videos.descricao like :descricao`, {
        descricao: `%${params.descricao}%`,
      });
    }

    if (params?.adesao) {
      queryBuilder.andWhere(`videos.adesao = :adesao`, {
        adesao: params.adesao,
      });
    }

    if (params?.uf) {
      queryBuilder.andWhere(`videos.uf = :uf`, {
        uf: params.uf,
      });
    }

    if (params?.cidade) {
      queryBuilder.andWhere(`videos.cidade like :cidade`, { cidade: `%${params.cidade}%` });
    }

    if (params?.product) {
      queryBuilder.andWhere(`product.id = :product`, { product: params.product });
    }

    if (params?.nome) {
      queryBuilder.andWhere(`videos.nome like :nome`, { nome: `%${params.descricao}%` });
    }

    if (params?.dtcadastro) {
      queryBuilder.andWhere(`videos.dtcadastro=:dtcadastro`, { dtcadastro: params.dtcadastro });
    }

    queryBuilder.leftJoinAndSelect('videos.product', 'product');
    // queryBuilder.leftJoinAndSelect('videos.campaing', 'campaing');
    queryBuilder.select([
      'videos.id',
      'videos.nome',
      'videos.descricao',
      'videos.link',
      'videos.uf',
      'videos.adesao',

      'videos.cidade',

      // 'campaing',
      'product',
      'videos.dtcadastro',
    ]);
    if (params?.pageCount && params?.page) {
      queryBuilder.skip(params.pageCount * (params.page - 1));
      queryBuilder.take(params.pageCount);
    }

    if (params?.order && params?.orderBy) {
      queryBuilder.orderBy('videos.' + params.orderBy, params.order);
    }
    queryBuilder.execute();
    paginatedData.itemCount = await queryBuilder.getCount();
    paginatedData.data = await queryBuilder.getMany();
    return paginatedData;
  }
  async findById(id: number): Promise<VideosEntity> {
    const queryBuilder = this.videosEntityRepository.createQueryBuilder('videos');
    // queryBuilder
    //   .leftJoinAndSelect('videos.campaing', 'campaing')
    //   .addSelect(['campaing.id', 'campaing.nome', 'campaing.dtcadastro']);
    queryBuilder
      .leftJoinAndSelect('videos.product', 'product')
      .addSelect(['product.id', 'product.nome', 'product.dtcadastro']);
    queryBuilder.andWhere('videos.id=:id', { id: id });
    queryBuilder.select([
      'videos.id',
      'videos.nome',
      'videos.link',
      'videos.uf',
      'videos.adesao',

      'videos.cidade',
      'videos.descricao',
      // 'campaing',
      'product',
      'videos.dtcadastro',
    ]);
    queryBuilder.execute();
    const videosEntity = await queryBuilder.getOne();

    return videosEntity;
  }
  async deleteById(id: number): Promise<void> {
    await this.videosEntityRepository.softDelete(id);
  }
}
