import { ICategory } from 'src/domain/entities/category.entity';

export class IUpdateFiles {
  id: number;
  nome: string;

  descricao: string;

  fileRelativePath: string;

  category: ICategory;

  tipo: string;
}
