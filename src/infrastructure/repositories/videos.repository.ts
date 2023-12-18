import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    const videosEntity = this.videosEntity(videos);
    await this.videosEntityRepository.update({ id: id }, videosEntity);
  }
  async insert(videos: VideosEntity): Promise<void> {
    const videosEntity = this.videosEntity(videos);
    await this.videosEntityRepository.insert(videosEntity);
  }
  async findAll(): Promise<VideosEntity[]> {
    const videosEntity = await this.videosEntityRepository.find();
    return videosEntity.map(videosEntity => this.videos(videosEntity));
  }
  async findById(id: number): Promise<VideosEntity> {
    const videosEntity = await this.videosEntityRepository.findOneBy({ id: id });
    return this.videos(videosEntity);
  }
  async deleteById(id: number): Promise<void> {
    await this.videosEntityRepository.delete({ id: id });
  }

  private videos(videosEntity: VideosEntity): VideosEntity {
    const videos: VideosEntity = new VideosEntity();

    videos.id = videosEntity.id;
    videos.deletado = videosEntity.deletado;
    videos.descricao = videosEntity.descricao;
    videos.dtcadastro = videosEntity.dtcadastro;
    videos.nome = videosEntity.nome;
    videos.modulo = videosEntity.modulo;
    videos.category = videosEntity.category;
    videos.link = videosEntity.link;

    return videos;
  }

  private videosEntity(videos: VideosEntity): VideosEntity {
    const videosEntity: VideosEntity = new VideosEntity();

    videosEntity.id = videos.id;
    videosEntity.deletado = videos.deletado;
    videosEntity.descricao = videos.descricao;
    videosEntity.dtcadastro = videos.dtcadastro;
    videosEntity.nome = videos.nome;
    videosEntity.modulo = videos.modulo;
    videosEntity.category = videos.category;
    videosEntity.link = videos.link;

    return videosEntity;
  }
}
