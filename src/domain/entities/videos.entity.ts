import { ICampaing } from './campaing.entity';
import { ICategory } from './category.entity';

export class IVideos {
  id?: number;

  deletado?: Date;

  descricao: string;

  link: string;

  nome: string;

  category: ICategory;

  campaing: ICampaing;

  dtcadastro?: Date;
}
