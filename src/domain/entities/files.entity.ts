import { AdhesionEnum } from 'src/infrastructure/enum/adhesion.enum';
import { IOperator } from './operators.entity';
import { IProduct } from './product.entity';

export class IFiles {
  id?: number;

  nome: string;

  descricao: string;

  dtcadastro?: Date;

  fileRelativePath: string;

  uf: string;

  adesao: AdhesionEnum;

  operator: IOperator;

  product: IProduct;

  tipo: string;

  deletado?: Date;
}
