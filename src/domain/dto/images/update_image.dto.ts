import { ICampaing } from 'src/domain/entities/campaing.entity';
import { ICategory } from 'src/domain/entities/category.entity';
import { IOperator } from 'src/domain/entities/operators.entity';
import { AdhesionEnum } from 'src/infrastructure/enum/adhesion.enum';

export class IUpdateImages {
  id?: number;

  nome: string;

  descricao: string;

  imageRelativePath: string;

  uf: string;

  adesao: AdhesionEnum;

  operator: IOperator;

  category: ICategory;

  campaing: ICampaing;
}
