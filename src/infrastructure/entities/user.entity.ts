import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AccessEntity } from './access.entity';

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

  @OneToMany(() => AccessEntity, access => access.user)
  access: AccessEntity[];

  @Column({ type: 'char', length: 1 })
  deletado: string;

  @Column({ type: 'varchar', length: 100 })
  perms: string;
}
