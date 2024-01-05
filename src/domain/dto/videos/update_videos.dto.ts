import { ICampaing } from 'src/domain/entities/campaing.entity';
import { ICategory } from 'src/domain/entities/category.entity';

export class IUpdateVideos {
  id: number;

  descricao: string;

  link: string;

  nome: string;

  category: ICategory;

  campaing: ICampaing;
}
