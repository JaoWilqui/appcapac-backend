import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AdhesionEnum } from '../enum/adhesion.enum';
import { OperatorsEntity } from './operators.entity';
import { ProductEntity } from './product.entity';

@Entity({ name: 'arquivos', synchronize: false })
export class FilesEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nome: string;

  @Column({ type: 'varchar', length: 250, nullable: false })
  descricao: string;

  @Column({ type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  dtcadastro: Date;

  @Column({ type: 'varchar', length: 300, nullable: false })
  fileRelativePath: string;

  @ManyToOne(() => ProductEntity, product => product.files)
  @JoinColumn({
    name: 'id_produto',
    referencedColumnName: 'id',
  })
  product: ProductEntity;

  @ManyToOne(() => OperatorsEntity, operators => operators.files)
  @JoinColumn({
    name: 'id_operadoras',
    referencedColumnName: 'id',
  })
  operator: OperatorsEntity;
  @Column({ type: 'varchar', length: 100 })
  cidade: string;

  @Column({ type: 'enum', enum: AdhesionEnum, nullable: false })
  adesao: AdhesionEnum;

  @Column({ type: 'varchar', length: 2 })
  uf: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  tipo: string;

  @DeleteDateColumn({ name: 'deletado' })
  deletado: Date;
}
