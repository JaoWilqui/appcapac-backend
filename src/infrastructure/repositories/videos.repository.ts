import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationDTO } from 'src/domain/dto/pagination.dto';
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
    await this.videosEntityRepository.insert(videosEntity);
  }
  async findAll(params: IPaginationDTO<VideosEntity>): Promise<IPaginationDTO<VideosEntity>> {
    const queryBuilder = this.videosEntityRepository.createQueryBuilder('videos');
    const paginatedData: IPaginationDTO<VideosEntity> = new IPaginationDTO<VideosEntity>();
    if (params?.filters) {
      Object.keys(params.filters).forEach(key => {
        if (params.filters[key]) {
          queryBuilder.andWhere(`videos.${key}=:${key}`, { [key]: params.filters[key] });
        }
      });
    }
    queryBuilder.andWhere('videos.deletado!=:deletado', { deletado: 'x' });
    queryBuilder.skip(params.pageCount * params.page);
    queryBuilder.take(params.pageCount);
    queryBuilder.orderBy(params.orderBy, params.order);
    paginatedData.itemCount = await queryBuilder.getCount();
    paginatedData.data = await queryBuilder.getMany();
    return paginatedData;
  }
  async findById(id: number): Promise<VideosEntity> {
    const videosEntity = await this.videosEntityRepository.findOneBy({ id: id });
    return videosEntity;
  }
  async deleteById(id: number): Promise<void> {
    await this.videosEntityRepository.update(id, { deletado: 'x' });
  }
}
