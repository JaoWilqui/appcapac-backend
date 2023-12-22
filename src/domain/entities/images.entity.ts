import { ICampaing } from './campaing.entity';
import { ICategory } from './category.entity';
import { IModules } from './modules.entity';

export class IImages {
  id: number;

  nome: string;

  descricao: string;

  imageRelativePath: string;

  category: ICategory;

  modulo: IModules;

  campaing: ICampaing;

  deletado: string;

  dtcadastro: Date;
}
