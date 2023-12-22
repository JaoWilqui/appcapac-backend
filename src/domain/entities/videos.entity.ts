import { ICampaing } from './campaing.entity';
import { ICategory } from './category.entity';
import { IModules } from './modules.entity';

export class IVideos {
  id: number;

  deletado: string;

  descricao: string;

  link: string;

  nome: string;

  fileRelativePath: string;

  category: ICategory;

  modulo: IModules;

  campaing: ICampaing;

  dtcadastro: Date;
}
