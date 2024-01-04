import { ICategory } from 'src/domain/entities/category.entity';

export class GetCategoryDto implements ICategory {
  id: number;

  descricao: string;

  nome: string;

  dtcadastro: Date;
}
