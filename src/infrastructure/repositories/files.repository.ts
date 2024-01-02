import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationDTO } from 'src/domain/dto/pagination.dto';
import { FilesEntity } from 'src/infrastructure/entities/files.entity';
import { TodoRepository } from 'src/infrastructure/repositories/_todo.repository';
import { Repository } from 'typeorm';

@Injectable()
export class FilesTodoRepository implements TodoRepository<FilesEntity> {
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
    await this.filesEntityRepository.insert(filesEntity);
  }
  async findAll(params: IPaginationDTO<FilesEntity>): Promise<IPaginationDTO<FilesEntity>> {
    const queryBuilder = this.filesEntityRepository.createQueryBuilder('files');
    const paginatedData: IPaginationDTO<FilesEntity> = new IPaginationDTO<FilesEntity>();
    // if (params?.filters) {
    //   Object.keys(params.filters).forEach(key => {
    //     if (params.filters[key]) {
    //       queryBuilder.andWhere(`files.${key}=:${key}`, { [key]: params.filters[key] });
    //     }
    //   });
    // }
    queryBuilder.andWhere('files.deletado!=:deletado', { deletado: 'x' });
    queryBuilder.skip(params.pageCount * params.page);
    queryBuilder.take(params.pageCount);
    queryBuilder.orderBy(params.orderBy, params.order);
    paginatedData.itemCount = await queryBuilder.getCount();
    paginatedData.data = await queryBuilder.getMany();
    return paginatedData;
  }
  async findById(id: number): Promise<FilesEntity> {
    const filesEntity = await this.filesEntityRepository.findOneBy({ id: id });
    return filesEntity;
  }
  async deleteById(id: number): Promise<void> {
    await this.filesEntityRepository.update(id, { deletado: 'x' });
  }
}
