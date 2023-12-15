import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/infrastructure/entities/category.entity';
import { TodoRepository } from 'src/infrastructure/repositories/_todo.repository';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryRepository implements TodoRepository<CategoryEntity> {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly CategoryEntityRepository: Repository<CategoryEntity>,
  ) {}

  async updateContent(id: number, category: CategoryEntity): Promise<void> {
    const categoryEntity = this.CategoryEntity(category);
    await this.CategoryEntityRepository.update({ id: id }, categoryEntity);
  }
  async insert(category: CategoryEntity): Promise<void> {
    const categoryEntity = this.CategoryEntity(category);
    await this.CategoryEntityRepository.insert(categoryEntity);
  }
  async findAll(): Promise<CategoryEntity[]> {
    const categoryEntity = await this.CategoryEntityRepository.find();
    return categoryEntity.map(categoryEntity => this.category(categoryEntity));
  }
  async findById(id: number): Promise<CategoryEntity> {
    const categoryEntity = await this.CategoryEntityRepository.findOneBy({ id: id });
    return this.category(categoryEntity);
  }
  async deleteById(id: number): Promise<void> {
    await this.CategoryEntityRepository.delete({ id: id });
  }

  private category(categoryEntity: CategoryEntity): CategoryEntity {
    const category: CategoryEntity = new CategoryEntity();

    category.id = categoryEntity.id;
    category.deletado = categoryEntity.deletado;
    category.descricao = categoryEntity.descricao;
    category.dtcadastro = categoryEntity.dtcadastro;
    category.nome = categoryEntity.nome;

    return category;
  }

  private CategoryEntity(category: CategoryEntity): CategoryEntity {
    const categoryEntity: CategoryEntity = new CategoryEntity();

    categoryEntity.id = category.id;
    categoryEntity.deletado = category.deletado;
    categoryEntity.descricao = category.descricao;
    categoryEntity.dtcadastro = category.dtcadastro;
    categoryEntity.nome = category.nome;

    return categoryEntity;
  }
}
