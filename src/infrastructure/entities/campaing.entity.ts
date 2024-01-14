import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CampaingEnum } from '../enum/campaning.enum';
import { ImagesEntity } from './images.entity';
import { VideosEntity } from './videos.entity';

@Entity({ name: 'campanha', synchronize: false })
export class CampaingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200, nullable: false })
  nome: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  descricao: string;

  @Column({ type: 'date', nullable: false })
  dtcadastro: Date;

  @Column({ type: 'date', nullable: false })
  dtinicio: Date;

  @Column({ type: 'date', nullable: false })
  dtfim: Date;

  @Column({ type: 'enum', enum: CampaingEnum, nullable: false })
  status: CampaingEnum;

  @OneToMany(() => VideosEntity, videos => videos.campaing)
  videos: VideosEntity[];

  @OneToMany(() => ImagesEntity, images => images.campaing)
  images: ImagesEntity[];

  @DeleteDateColumn({ name: 'deletado' })
  deletado: Date;
}
