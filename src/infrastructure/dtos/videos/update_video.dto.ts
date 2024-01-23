import { IsNotEmpty } from 'class-validator';
import { IUpdateVideos } from 'src/domain/dto/videos/update_videos.dto';
import { IProduct } from 'src/domain/entities/product.entity';
import { AdhesionEnum } from 'src/infrastructure/enum/adhesion.enum';

export class UpdateVideoDTO implements IUpdateVideos {
  @IsNotEmpty({ message: 'O campo uf é obrigatório' })
  uf: string;
  @IsNotEmpty({ message: 'O campo adesao é obrigatório' })
  adesao: AdhesionEnum;
  @IsNotEmpty({ message: 'O campo cidade é obrigatório' })
  cidade: string;
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
  // @IsNotEmpty({ message: 'O campo campaing é obrigatório' })
  // campaing: ICampaing;
}
