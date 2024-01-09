import { ICategory } from 'src/domain/entities/category.entity';

export class ICreateFiles {
  nome: string;

  descricao: string;

  fileRelativePath: string;

  category: ICategory;

  tipo: string;
}
