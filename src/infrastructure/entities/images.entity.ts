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
import { OperatorsEntity } from './operators.entity';
import { ProductEntity } from './product.entity';

@Entity({ name: 'imagens', synchronize: false })
export class ImagesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nome: string;

  @Column({ type: 'varchar', length: 50 })
  descricao: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  imageRelativePath: string;

  @ManyToOne(() => ProductEntity, product => product.images)
  @JoinColumn({
    name: 'id_produto',
    referencedColumnName: 'id',
  })
  product: ProductEntity;

  @ManyToOne(() => OperatorsEntity, operators => operators.images)
  @JoinColumn({
    name: 'id_operadoras',
    referencedColumnName: 'id',
  })
  operator: OperatorsEntity;

  @ManyToOne(() => CampaingEntity, campaing => campaing.images)
  @JoinColumn({
    name: 'id_campanha',
    referencedColumnName: 'id',
  })
  campaing: CampaingEntity;

  @Column({ type: 'enum', enum: AdhesionEnum, nullable: false })
  adesao: AdhesionEnum;

  @Column({ type: 'varchar', length: 2 })
  uf: string;

  @Column({ type: 'date', nullable: false })
  dtcadastro: Date;

  @DeleteDateColumn({ name: 'deletado' })
  deletado: Date;
}
