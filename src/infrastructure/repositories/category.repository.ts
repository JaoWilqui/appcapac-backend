import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationDTO } from 'src/domain/dto/pagination.dto';
import { CategoryEntity } from 'src/infrastructure/entities/category.entity';
import { TodoRepository } from 'src/infrastructure/repositories/_todo.repository';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryTodoRepository implements TodoRepository<CategoryEntity> {
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
  async findAll(params: IPaginationDTO<CategoryEntity>): Promise<IPaginationDTO<CategoryEntity>> {
    const queryBuilder = this.categoryEntityRepository.createQueryBuilder('category');
    const paginatedData: IPaginationDTO<CategoryEntity> = new IPaginationDTO<CategoryEntity>();
    // if (params?.filters) {
    //   Object.keys(params.filters).forEach(key => {
    //     if (params.filters[key]) {
    //       queryBuilder.andWhere(`category.${key}=:${key}`, { [key]: params.filters[key] });
    //     }
    //   });
    // }
    queryBuilder.andWhere('category.deletado!=:deletado', { deletado: 'x' });
    queryBuilder.skip(params.pageCount * params.page);
    queryBuilder.take(params.pageCount);
    queryBuilder.orderBy(params.orderBy, params.order);
    paginatedData.itemCount = await queryBuilder.getCount();
    paginatedData.data = await queryBuilder.getMany();
    return paginatedData;
  }
  async findById(id: number): Promise<CategoryEntity> {
    const categoryEntity = await this.categoryEntityRepository.findOneBy({ id: id });
    return categoryEntity;
  }
  async deleteById(id: number): Promise<void> {
    await this.categoryEntityRepository.update(id, { deletado: 'x' });
  }
}
