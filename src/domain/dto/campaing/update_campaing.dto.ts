import { CampaingEnum } from 'src/infrastructure/enum/campaning.enum';

export class IUpdateCampaing {
  id: number;

  nome: string;

  descricao: string;

  dtinicio: Date;

  dtfim: Date;

  status: CampaingEnum;
}
