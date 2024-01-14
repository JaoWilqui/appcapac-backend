import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CampaingEntity } from './campaing.entity';
import { CategoryEntity } from './category.entity';
import { OperatorsEntity } from './operators.entity';

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

  @ManyToOne(() => CategoryEntity, category => category.images)
  @JoinColumn({
    name: 'id_categoria',
    referencedColumnName: 'id',
  })
  category: CategoryEntity;

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

  @Column({ type: 'date', nullable: false })
  dtcadastro: Date;

  @DeleteDateColumn({ name: 'deletado' })
  deletado: Date;
}
