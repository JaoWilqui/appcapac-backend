import { ICampaing } from './campaing.entity';
import { ICategory } from './category.entity';

export class IImages {
  id?: number;

  nome: string;

  descricao: string;

  imageRelativePath: string;

  category: ICategory;

  campaing: ICampaing;

  deletado?: string;

  dtcadastro?: Date;
}
