import { IsNotEmpty } from 'class-validator';
import { IUpdateImages } from 'src/domain/dto/images/update_image.dto';
import { ICampaing } from 'src/domain/entities/campaing.entity';
import { ICategory } from 'src/domain/entities/category.entity';

export class UpdateImagesDTO implements IUpdateImages {
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  id: number;
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  nome: string;
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  descricao: string;
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  imageRelativePath: string;
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  category: ICategory;
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  campaing: ICampaing;
}
