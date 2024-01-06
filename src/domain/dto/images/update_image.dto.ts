import { ICampaing } from 'src/domain/entities/campaing.entity';
import { ICategory } from 'src/domain/entities/category.entity';

export class IUpdateImages {
  id?: number;

  nome: string;

  descricao: string;

  imageRelativePath: string;

  category: ICategory;

  campaing: ICampaing;
}
