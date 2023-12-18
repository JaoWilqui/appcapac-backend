import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TodoRepository } from 'src/infrastructure/repositories/_todo.repository';
import { Repository } from 'typeorm';
import { ImagesEntity } from '../entities/images.entity';

@Injectable()
export class ImagesRepository implements TodoRepository<ImagesEntity> {
  constructor(
    @InjectRepository(ImagesEntity)
    private readonly imagesEntityRepository: Repository<ImagesEntity>,
  ) {}

  async updateContent(id: number, images: ImagesEntity): Promise<void> {
    const imagesEntity = this.imagesEntity(images);
    await this.imagesEntityRepository.update({ id: id }, imagesEntity);
  }
  async insert(images: ImagesEntity): Promise<void> {
    const imagesEntity = this.imagesEntity(images);
    await this.imagesEntityRepository.insert(imagesEntity);
  }
  async findAll(): Promise<ImagesEntity[]> {
    const imagesEntity = await this.imagesEntityRepository.find();
    return imagesEntity.map(imagesEntity => this.images(imagesEntity));
  }
  async findById(id: number): Promise<ImagesEntity> {
    const imagesEntity = await this.imagesEntityRepository.findOneBy({ id: id });
    return this.images(imagesEntity);
  }
  async deleteById(id: number): Promise<void> {
    await this.imagesEntityRepository.delete({ id: id });
  }

  private images(imagesEntity: ImagesEntity): ImagesEntity {
    const images: ImagesEntity = new ImagesEntity();

    images.id = imagesEntity.id;
    images.deletado = imagesEntity.deletado;
    images.nome = imagesEntity.nome;
    images.modulo = imagesEntity.modulo;
    images.category = imagesEntity.category;
    images.campaing = imagesEntity.campaing;
    images.dtcadastro = imagesEntity.dtcadastro;
    images.imageRelativePath = imagesEntity.imageRelativePath;
    images.descricao = imagesEntity.descricao;

    return images;
  }

  private imagesEntity(images: ImagesEntity): ImagesEntity {
    const imagesEntity: ImagesEntity = new ImagesEntity();

    imagesEntity.id = images.id;
    imagesEntity.deletado = images.deletado;
    imagesEntity.nome = images.nome;
    imagesEntity.modulo = images.modulo;
    imagesEntity.category = images.category;
    imagesEntity.campaing = images.campaing;
    imagesEntity.dtcadastro = images.dtcadastro;
    imagesEntity.imageRelativePath = images.imageRelativePath;
    imagesEntity.descricao = images.descricao;

    return imagesEntity;
  }
}
