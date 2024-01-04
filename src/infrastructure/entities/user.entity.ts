import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Perms } from '../enum/permissions.enum';
import { ModulesEntity } from './modules.entity';

@Entity({ name: 'usuarios', synchronize: false })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 250, nullable: false })
  nome: string;

  @Column({ type: 'varchar', length: 250, nullable: false })
  sobrenome: string;

  @Column({ type: 'varchar', length: 250, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  senha: string;

  @Column({ type: 'date', nullable: false })
  dtcadastro: Date;

  @ManyToMany(() => ModulesEntity)
  @JoinTable({
    name: 'acessos',
    joinColumn: {
      name: 'id_user',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'id_modulo',
      referencedColumnName: 'id',
    },
  })
  modules: ModulesEntity[];

  @Column({ type: 'char', length: 1 })
  deletado: string;

  @Column({ type: 'enum', enum: Perms, nullable: false })
  perms: Perms;
}
