import { IsNotEmpty } from 'class-validator';
import { ICampaing } from 'src/domain/entities/campaing.entity';
import { ICategory } from 'src/domain/entities/category.entity';
import { IVideos } from 'src/domain/entities/videos.entity';

export class GetVideoDto implements IVideos {
  @IsNotEmpty({ message: 'O campo descricao é obrigatório' })
  descricao: string;
  @IsNotEmpty({ message: 'O campo link é obrigatório' })
  link: string;
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  nome: string;
  @IsNotEmpty({ message: 'O campo category é obrigatório' })
  category: ICategory;
  @IsNotEmpty({ message: 'O campo campaing é obrigatório' })
  campaing: ICampaing;
}
