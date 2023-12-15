import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FilesEntity } from './files.entity';
import { ImagesEntity } from './images.entity';
import { VideosEntity } from './videos.entity';

@Entity({ name: 'categoria', synchronize: false })
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200, nullable: false })
  nome: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  descricao: string;

  @Column({ type: 'date', nullable: false })
  dtcadastro: Date;

  @OneToMany(() => FilesEntity, file => file.categoria)
  arquivos: FilesEntity[];

  @OneToMany(() => VideosEntity, videos => videos.category)
  videos: VideosEntity[];

  @OneToMany(() => ImagesEntity, images => images.category)
  images: ImagesEntity[];

  @Column({ type: 'char', length: 1 })
  deletado: string;
}
