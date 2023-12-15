import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { ModulesEntity } from './modules.entity';

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

  @ManyToOne(() => CategoryEntity, category => category.arquivos)
  @JoinColumn({
    name: 'id_categoria',
    referencedColumnName: 'id',
  })
  categoria: CategoryEntity;

  @ManyToOne(() => ModulesEntity, module => module.arquivos)
  @JoinColumn({
    name: 'id_modulos',
    referencedColumnName: 'id',
  })
  modulo: ModulesEntity;

  @Column({ type: 'varchar', length: 50, nullable: false })
  tipo: string;

  @Column({ type: 'char', length: 1 })
  deletado: string;
}
