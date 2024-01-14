import { ICategory } from 'src/domain/entities/category.entity';
import { IOperator } from 'src/domain/entities/operators.entity';
import { AdhesionEnum } from 'src/infrastructure/enum/adhesion.enum';

export class ICreateFiles {
  nome: string;

  descricao: string;

  fileRelativePath: string;

  uf: string;

  adesao: AdhesionEnum;

  operator: IOperator;

  category: ICategory;

  tipo: string;
}
