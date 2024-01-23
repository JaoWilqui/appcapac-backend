import { AdhesionEnum } from 'src/infrastructure/enum/adhesion.enum';
import { ICampaing } from './campaing.entity';
import { IOperator } from './operators.entity';
import { IProduct } from './product.entity';

export class IImages {
  id?: number;

  nome: string;

  descricao: string;

  imageRelativePath: string;

  uf: string;

  adesao: AdhesionEnum;

  product: IProduct;

  cidade: string;

  operator: IOperator;

  campaing: ICampaing;

  deletado?: Date;

  dtcadastro?: Date;
}
