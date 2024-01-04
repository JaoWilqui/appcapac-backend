import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CampaingEntity } from './campaing.entity';
import { CategoryEntity } from './category.entity';

@Entity({ name: 'videos', synchronize: false })
export class VideosEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 1 })
  deletado: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  descricao: string;

  @Column({ type: 'varchar', length: 350, nullable: false })
  link: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  nome: string;

  @ManyToOne(() => CategoryEntity, category => category.videos)
  @JoinColumn({
    name: 'id_categoria',
    referencedColumnName: 'id',
  })
  category: CategoryEntity;

  @ManyToOne(() => CampaingEntity, campaing => campaing)
  @JoinColumn({
    name: 'id_campanha',
    referencedColumnName: 'id',
  })
  campaing: CampaingEntity;

  @Column({ type: 'date', nullable: false })
  dtcadastro: Date;
}
