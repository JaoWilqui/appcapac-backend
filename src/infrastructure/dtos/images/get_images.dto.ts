import { ICampaing } from 'src/domain/entities/campaing.entity';
import { ICategory } from 'src/domain/entities/category.entity';
import { IImages } from 'src/domain/entities/images.entity';

export class GetImagesDTO implements IImages {
  id?: number;

  nome: string;

  descricao: string;

  imageRelativePath: string;

  category: ICategory;

  campaing: ICampaing;

  deletado?: string;
  dtcadastro?: Date;
}
