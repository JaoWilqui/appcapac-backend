import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { OperatorsEntity } from './operators.entity';

@Entity({ name: 'arquivos', synchronize: false })
export class FilesEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nome: string;

  @Column({ type: 'varchar', length: 250, nullable: false })
  descricao: string;

  @Column({ type: 'date', nullable: false })
  dtcadastro: Date;

  @Column({ type: 'varchar', length: 300, nullable: false })
  fileRelativePath: string;

  @ManyToOne(() => CategoryEntity, category => category.files)
  @JoinColumn({
    name: 'id_categoria',
    referencedColumnName: 'id',
  })
  category: CategoryEntity;

  @ManyToOne(() => OperatorsEntity, operators => operators.files)
  @JoinColumn({
    name: 'id_operadoras',
    referencedColumnName: 'id',
  })
  operator: OperatorsEntity;

  @Column({ type: 'varchar', length: 50, nullable: false })
  tipo: string;

  @DeleteDateColumn({ name: 'deletado' })
  deletado: Date;
}
