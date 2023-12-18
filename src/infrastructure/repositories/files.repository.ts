import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesEntity } from 'src/infrastructure/entities/files.entity';
import { TodoRepository } from 'src/infrastructure/repositories/_todo.repository';
import { Repository } from 'typeorm';

@Injectable()
export class FilesTodoRepository implements TodoRepository<FilesEntity> {
  constructor(
    @InjectRepository(FilesEntity)
    private readonly FilesEntityRepository: Repository<FilesEntity>,
  ) {}

  async updateContent(id: number, file: FilesEntity): Promise<void> {
    const filesEntity = this.filesEntity(file);
    await this.FilesEntityRepository.update({ id: id }, filesEntity);
  }
  async insert(file: FilesEntity): Promise<void> {
    const filesEntity = this.filesEntity(file);
    await this.FilesEntityRepository.insert(filesEntity);
  }
  async findAll(): Promise<FilesEntity[]> {
    const todosEntity = await this.FilesEntityRepository.find();
    return todosEntity.map(todoEntity => this.files(todoEntity));
  }
  async findById(id: number): Promise<FilesEntity> {
    const todoEntity = await this.FilesEntityRepository.findOneBy({ id: id });
    return this.files(todoEntity);
  }
  async deleteById(id: number): Promise<void> {
    await this.FilesEntityRepository.delete({ id: id });
  }

  private files(filesEntity: FilesEntity): FilesEntity {
    const file: FilesEntity = new FilesEntity();

    file.id = filesEntity.id;
    file.deletado = filesEntity.deletado;
    file.descricao = filesEntity.descricao;
    file.dtcadastro = filesEntity.dtcadastro;
    file.categoria = filesEntity.categoria;
    file.modulo = filesEntity.modulo;
    file.nome = filesEntity.nome;
    file.fileRelativePath = filesEntity.fileRelativePath;
    file.tipo = filesEntity.tipo;

    return file;
  }

  private filesEntity(file: FilesEntity): FilesEntity {
    const filesEntity: FilesEntity = new FilesEntity();

    filesEntity.id = file.id;
    filesEntity.deletado = file.deletado;
    filesEntity.descricao = file.descricao;
    filesEntity.dtcadastro = file.dtcadastro;
    filesEntity.categoria = file.categoria;
    filesEntity.modulo = file.modulo;
    filesEntity.nome = file.nome;
    filesEntity.fileRelativePath = file.fileRelativePath;
    filesEntity.tipo = file.tipo;

    return filesEntity;
  }
}
