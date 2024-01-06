import { IsNotEmpty } from 'class-validator';
import { ICreateImages } from 'src/domain/dto/images/create_images.dto';
import { ICampaing } from 'src/domain/entities/campaing.entity';
import { ICategory } from 'src/domain/entities/category.entity';

export class CreateImagesDTO implements ICreateImages {
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
