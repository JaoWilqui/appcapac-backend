import { AdhesionEnum } from 'src/infrastructure/enum/adhesion.enum';
import { ICampaing } from './campaing.entity';
import { ICategory } from './category.entity';
import { IOperator } from './operators.entity';

export class IImages {
  id?: number;

  nome: string;

  descricao: string;

  imageRelativePath: string;

  uf: string;

  adesao: AdhesionEnum;

  category: ICategory;

  operator: IOperator;

  campaing: ICampaing;

  deletado?: Date;

  dtcadastro?: Date;
}
