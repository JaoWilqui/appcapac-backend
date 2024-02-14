import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AdhesionEnum } from '../enum/adhesion.enum';
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

  @Column({ type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  dtcadastro: Date;

  @Column({ type: 'varchar', length: 100 })
  cidade: string;

  @Column({ type: 'enum', enum: AdhesionEnum, nullable: false })
  adesao: AdhesionEnum;

  @Column({ type: 'varchar', length: 2 })
  uf: string;

  @DeleteDateColumn({ name: 'deletado' })
  deletado: Date;
}
