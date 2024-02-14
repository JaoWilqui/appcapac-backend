import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ModulesEnum } from '../enum/modules.enum';
import { AccessEntity } from './access.entity';

@Entity({ name: 'modulos', synchronize: false })
export class ModulesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ModulesEnum, nullable: false })
  nome: ModulesEnum;

  @Column({ type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  dtcadastro: Date;

  @OneToMany(() => AccessEntity, access => access.modulo)
  access: AccessEntity[];

  @DeleteDateColumn({ name: 'deletado' })
  deletado: Date;
}
