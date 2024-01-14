import { AdhesionEnum } from 'src/infrastructure/enum/adhesion.enum';
import { ICategory } from './category.entity';
import { IOperator } from './operators.entity';

export class IFiles {
  id?: number;

  nome: string;

  descricao: string;

  dtcadastro?: Date;

  fileRelativePath: string;

  uf: string;

  adesao: AdhesionEnum;

  operator: IOperator;

  category: ICategory;

  tipo: string;

  deletado?: Date;
}
