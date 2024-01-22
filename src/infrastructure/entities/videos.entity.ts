import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CampaingEntity } from './campaing.entity';
import { ProductEntity } from './product.entity';

@Entity({ name: 'videos', synchronize: false })
export class VideosEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  descricao: string;

  @Column({ type: 'varchar', length: 350, nullable: false })
  link: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  nome: string;

  @ManyToOne(() => ProductEntity, product => product.videos)
  @JoinColumn({
    name: 'id_produto',
    referencedColumnName: 'id',
  })
  product: ProductEntity;

  @ManyToOne(() => CampaingEntity, campaing => campaing)
  @JoinColumn({
    name: 'id_campanha',
    referencedColumnName: 'id',
  })
  campaing: CampaingEntity;

  @Column({ type: 'date', nullable: false })
  dtcadastro: Date;

  @DeleteDateColumn({ name: 'deletado' })
  deletado: Date;
}
