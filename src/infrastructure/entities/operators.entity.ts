import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FilesEntity } from './files.entity';
import { ImagesEntity } from './images.entity';

@Entity({ name: 'operadoras', synchronize: false })
export class OperatorsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  nome: string;

  @Column({ type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  dtcadastro: Date;

  @DeleteDateColumn({ name: 'deletado' })
  deletado: Date;

  @OneToMany(() => ImagesEntity, images => images.operator)
  images: ImagesEntity[];

  @OneToMany(() => FilesEntity, files => files.operator)
  files: FilesEntity[];
}
