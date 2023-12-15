import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AccessEntity } from './access.entity';
import { FilesEntity } from './files.entity';
import { ImagesEntity } from './images.entity';
import { VideosEntity } from './videos.entity';

@Entity({ name: 'modulos', synchronize: false })
export class ModulesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200, nullable: false })
  nome: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  dtcadastros: Date;

  @Column({ type: 'char', length: 1 })
  deletado: string;

  @OneToMany(() => FilesEntity, file => file.modulo)
  arquivos: FilesEntity[];

  @OneToMany(() => AccessEntity, access => access.modulo)
  access: AccessEntity[];

  @OneToMany(() => VideosEntity, videos => videos.modulo)
  videos: VideosEntity[];

  @OneToMany(() => ImagesEntity, images => images.modulo)
  images: ImagesEntity[];
}
