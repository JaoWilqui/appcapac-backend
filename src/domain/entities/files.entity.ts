import { ICategory } from './category.entity';

export class IFiles {
  id: number;

  nome: string;

  descricao: string;

  dtcadastro: Date;

  fileRelativePath: string;

  categoria: ICategory;

  tipo: string;

  deletado: string;
}
