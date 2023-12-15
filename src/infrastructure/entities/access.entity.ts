import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ModulesEntity } from './modules.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'acesso', synchronize: false })
export class AccessEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, user => user)
  @JoinColumn({
    name: 'id_user',
    referencedColumnName: 'id',
  })
  user: UserEntity[];

  @ManyToOne(() => ModulesEntity, module => module)
  @JoinColumn({
    name: 'id_modulos',
    referencedColumnName: 'id',
  })
  modulo: ModulesEntity;

  @Column({ type: 'date' })
  dtcadastro: Date;
}
