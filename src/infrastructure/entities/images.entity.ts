import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CampaingEntity } from './campaing.entity';
import { CategoryEntity } from './category.entity';
import { ModulesEntity } from './modules.entity';

@Entity({ name: 'imagens', synchronize: false })
export class ImagesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  nome: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  descricao: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  imageRelativePath: string;

  @ManyToOne(() => CategoryEntity, category => category.images)
  @JoinColumn({
    name: 'id_categoria',
    referencedColumnName: 'id',
  })
  category: CategoryEntity;

  @ManyToOne(() => ModulesEntity, module => module.images)
  @JoinColumn({
    name: 'id_modulos',
    referencedColumnName: 'id',
  })
  modulo: ModulesEntity;

  @ManyToOne(() => CampaingEntity, campaing => campaing)
  @JoinColumn({
    name: 'id_campanha',
    referencedColumnName: 'id',
  })
  campaing: CampaingEntity;

  @Column({ type: 'char', length: 1 })
  deletado: string;

  @Column({ type: 'date', nullable: false })
  dtcadastro: Date;
}
