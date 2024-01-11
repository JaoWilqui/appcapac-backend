import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationDTO } from 'src/domain/dto/pagination.dto';
import { IFiles } from 'src/domain/entities/files.entity';
import { FilesEntity } from 'src/infrastructure/entities/files.entity';
import { TodoRepository } from 'src/infrastructure/repositories/_todo.repository';
import { Repository } from 'typeorm';

@Injectable()
export class FilesRepository implements TodoRepository<FilesEntity> {
  constructor(
    @InjectRepository(FilesEntity)
    private readonly filesEntityRepository: Repository<FilesEntity>,
  ) {}

  async updateContent(id: number, file: FilesEntity): Promise<void> {
    const filesEntity = file;
    await this.filesEntityRepository.update({ id: id }, filesEntity);
  }
  async insert(file: FilesEntity): Promise<void> {
    const filesEntity = file;
    await this.filesEntityRepository.save(filesEntity);
  }
  async findAll(
    params: IPaginationDTO<FilesEntity> & IFiles,
  ): Promise<IPaginationDTO<FilesEntity>> {
    const queryBuilder = this.filesEntityRepository.createQueryBuilder('files');
    const paginatedData: IPaginationDTO<FilesEntity> = new IPaginationDTO<FilesEntity>();

    if (params?.id) {
      queryBuilder.andWhere(`files.id=:id`, { id: params.id });
    }

    if (params?.descricao) {
      queryBuilder.andWhere(`files.descricao like :descricao`, {
        descricao: `%${params.descricao}%`,
      });
    }

    if (params?.nome) {
      queryBuilder.andWhere(`files.nome like :nome`, { nome: `%${params.descricao}%` });
    }

    if (params?.tipo) {
      queryBuilder.andWhere(`files.tipo like :tipo`, { nome: `%${params.tipo}%` });
    }

    if (params?.dtcadastro) {
      queryBuilder.andWhere(`files.dtcadastro >= :dtcadastro`, { dtcadastro: params.dtcadastro });
    }

    queryBuilder.leftJoinAndSelect('files.category', 'category');
    queryBuilder.andWhere('files.deletado IS NULL');
    queryBuilder.select([
      'files.id',
      'files.nome',
      'files.tipo',
      'files.fileRelativePath',
      'files.descricao',
      'category',
      'files.dtcadastro',
    ]);
    if (params?.pageCount && params?.page) {
      queryBuilder.skip(params.pageCount * (params.page - 1));
      queryBuilder.take(params.pageCount);
    }

    if (params?.order && params?.orderBy) {
      queryBuilder.orderBy('files.' + params.orderBy, params.order);
    }
    queryBuilder.execute();

    paginatedData.itemCount = await queryBuilder.getCount();
    paginatedData.data = await queryBuilder.getMany();
    return paginatedData;
  }
  async findById(id: number): Promise<FilesEntity> {
    const queryBuilder = this.filesEntityRepository.createQueryBuilder('files');
    queryBuilder
      .leftJoinAndSelect('files.category', 'category')
      .addSelect(['category.id', 'category.nome', 'campaing.dtcadastro']);
    queryBuilder.andWhere('files.id=:id', { id: id });
    queryBuilder.andWhere('files.deletado IS NULL');
    queryBuilder.select([
      'files.id',
      'files.nome',
      'files.tipo',
      'files.fileRelativePath',
      'files.descricao',
      'campaing',
      'category',
      'files.dtcadastro',
    ]);
    queryBuilder.execute();
    const filesEntity = await queryBuilder.getOne();

    return filesEntity;
  }
  async deleteById(id: number): Promise<void> {
    await this.filesEntityRepository.update(id, { deletado: 'x' });
  }
}
