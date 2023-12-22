import { ICategory } from './category.entity';
import { IModules } from './modules.entity';

export class IFiles {
  id: number;

  nome: string;

  descricao: string;

  dtcadastro: Date;

  fileRelativePath: string;

  categoria: ICategory;

  modulo: IModules;

  tipo: string;

  deletado: string;
}
