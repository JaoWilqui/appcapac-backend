import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column({ type: 'char', length: 1, nullable: false })
  deletado: string;

  @Column({ type: 'int', nullable: false })
  status: string;

  @OneToMany(() => VideosEntity, videos => videos.campaing)
  videos: VideosEntity[];

  @OneToMany(() => ImagesEntity, images => images.campaing)
  images: ImagesEntity[];
}
