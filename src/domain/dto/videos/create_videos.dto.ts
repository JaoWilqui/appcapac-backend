import { ICampaing } from 'src/domain/entities/campaing.entity';
import { ICategory } from 'src/domain/entities/category.entity';

export class ICreateVideos {
  descricao: string;

  link: string;

  nome: string;

  category: ICategory;

  campaing: ICampaing;
}
