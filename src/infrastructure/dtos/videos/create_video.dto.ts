import { IsNotEmpty } from 'class-validator';
import { ICreateVideos } from 'src/domain/dto/videos/create_videos.dto';
import { ICampaing } from 'src/domain/entities/campaing.entity';
import { IProduct } from 'src/domain/entities/product.entity';
import { AdhesionEnum } from 'src/infrastructure/enum/adhesion.enum';

export class CreateVideoDTO implements ICreateVideos {
  @IsNotEmpty({ message: 'O campo uf é obrigatório' })
  uf: string;

  @IsNotEmpty({ message: 'O campo adesao é obrigatório' })
  adesao: AdhesionEnum;
  @IsNotEmpty({ message: 'O campo cidade é obrigatório' })
  cidade: string;
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
