import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FilesEntity } from './files.entity';
import { ImagesEntity } from './images.entity';
import { VideosEntity } from './videos.entity';

@Entity({ name: 'produtos', synchronize: false })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200, nullable: false })
  nome: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  descricao: string;

  @Column({ type: 'date', nullable: false })
  dtcadastro: Date;

  @OneToMany(() => FilesEntity, file => file.product)
  files: FilesEntity[];

  @OneToMany(() => VideosEntity, videos => videos.product)
  videos: VideosEntity[];

  @OneToMany(() => ImagesEntity, images => images.product)
  images: ImagesEntity[];

  @DeleteDateColumn({ name: 'deletado' })
  deletado: Date;
}
