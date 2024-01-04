import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ModulesEnum } from '../enum/modules.enum';
import { AccessEntity } from './access.entity';

@Entity({ name: 'modulos', synchronize: false })
export class ModulesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ModulesEnum, nullable: false })
  nome: ModulesEnum;

  @Column({ type: 'varchar', length: 200, nullable: false })
  dtcadastros: Date;

  @Column({ type: 'char', length: 1 })
  deletado: string;

  @OneToMany(() => AccessEntity, access => access.modulo)
  access: AccessEntity[];
}
