import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationDTO } from 'src/domain/dto/pagination.dto';
import { ICategory } from 'src/domain/entities/category.entity';
import { CategoryEntity } from 'src/infrastructure/entities/category.entity';
import { TodoRepository } from 'src/infrastructure/repositories/_todo.repository';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryRepository implements TodoRepository<CategoryEntity> {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryEntityRepository: Repository<CategoryEntity>,
  ) {}

  async updateContent(id: number, category: CategoryEntity): Promise<void> {
    const categoryEntity = category;
    await this.categoryEntityRepository.update({ id: id }, categoryEntity);
  }
  async insert(category: CategoryEntity): Promise<void> {
    const categoryEntity = category;
    await this.categoryEntityRepository.insert(categoryEntity);
  }
  async findAll(
    params: IPaginationDTO<CategoryEntity> & ICategory,
  ): Promise<IPaginationDTO<CategoryEntity>> {
    const queryBuilder = this.categoryEntityRepository.createQueryBuilder('category');
    const paginatedData: IPaginationDTO<CategoryEntity> = new IPaginationDTO<CategoryEntity>();

    if (params?.id) {
      queryBuilder.andWhere(`category.id=:id`, { id: params.id });
    }

    if (params?.nome) {
      queryBuilder.andWhere(`category.nome like :nome`, { nome: `%${params.nome}%` });
    }

    if (params?.descricao) {
      queryBuilder.andWhere(`category.descricao like :descricao `, {
        descricao: `%${params.descricao}%`,
      });
    }
    if (params?.dtcadastro) {
      queryBuilder.andWhere(`category.dtcadastro >= :dtcadastro`, {
        dtcadastro: params.dtcadastro,
      });
    }

    queryBuilder.andWhere('category.deletado IS NULL');
    queryBuilder.select([
      'category.id',
      'category.nome',
      'category.descricao',
      'category.dtcadastro',
    ]);
    if (params?.pageCount && params?.page) {
      queryBuilder.skip(params.pageCount * (params.page - 1));
      queryBuilder.take(params.pageCount);
    }

    if (params?.order && params?.orderBy) {
      queryBuilder.orderBy('category.' + params.orderBy, params.order);
    }
    queryBuilder.execute();
    paginatedData.itemCount = await queryBuilder.getCount();
    paginatedData.data = await queryBuilder.getMany();
    return paginatedData;
  }
  async findById(id: number): Promise<CategoryEntity> {
    const queryBuilder = this.categoryEntityRepository.createQueryBuilder('category');
    queryBuilder.andWhere('category.id=:id', { id: id });
    queryBuilder.andWhere('category.deletado IS NULL');
    queryBuilder.select([
      'category.id',
      'category.nome',
      'category.descricao',
      'category.dtcadastro',
    ]);
    queryBuilder.execute();
    const categoryEntity = await queryBuilder.getOne();

    return categoryEntity;
  }
  async deleteById(id: number): Promise<void> {
    await this.categoryEntityRepository.update(id, { deletado: 'x' });
  }
}
