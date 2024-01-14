import { ICampaing } from 'src/domain/entities/campaing.entity';
import { ICategory } from 'src/domain/entities/category.entity';
import { IImages } from 'src/domain/entities/images.entity';
import { IOperator } from 'src/domain/entities/operators.entity';
import { AdhesionEnum } from 'src/infrastructure/enum/adhesion.enum';

export class GetImagesDTO implements IImages {
  id?: number;

  nome: string;

  uf: string;

  adesao: AdhesionEnum;

  descricao: string;

  imageRelativePath: string;

  operator: IOperator;

  category: ICategory;

  campaing: ICampaing;

  dtcadastro?: Date;
}
