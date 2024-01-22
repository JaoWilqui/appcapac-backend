import { IsNotEmpty } from 'class-validator';
import { IUpdateVideos } from 'src/domain/dto/videos/update_videos.dto';
import { ICampaing } from 'src/domain/entities/campaing.entity';
import { IProduct } from 'src/domain/entities/product.entity';

export class UpdateVideoDTO implements IUpdateVideos {
  @IsNotEmpty({ message: 'O campo id é obrigatório' })
  id: number;
  @IsNotEmpty({ message: 'O campo descricao é obrigatório' })
  descricao: string;
  @IsNotEmpty({ message: 'O campo link é obrigatório' })
  link: string;
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  nome: string;
  @IsNotEmpty({ message: 'O campo product é obrigatório' })
  product: IProduct;
  @IsNotEmpty({ message: 'O campo campaing é obrigatório' })
  campaing: ICampaing;
}
