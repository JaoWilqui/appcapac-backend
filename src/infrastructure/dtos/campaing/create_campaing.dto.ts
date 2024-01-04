import { IsNotEmpty } from 'class-validator';
import { ICreateCampaing } from 'src/domain/dto/campaing/create_campaing.dto';
import { CampaingEnum } from 'src/infrastructure/enum/campaning.enum';

export class CreateCampaingDTO implements ICreateCampaing {
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  nome: string;

  @IsNotEmpty({ message: 'O campo descricao é obrigatório' })
  descricao: string;

  @IsNotEmpty({ message: 'O campo descricao é obrigatório' })
  dtinicio: Date;

  @IsNotEmpty({ message: 'O campo descricao é obrigatório' })
  dtfim: Date;

  @IsNotEmpty({ message: 'O campo descricao é obrigatório' })
  status: CampaingEnum;
}
