import { ICampaing } from 'src/domain/entities/campaing.entity';
import { ICategory } from 'src/domain/entities/category.entity';

export class ICreateImages {
  nome: string;

  descricao: string;

  imageRelativePath: string;

  category: ICategory;

  campaing: ICampaing;
}
