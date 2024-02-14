import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ModulesEntity } from './modules.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'acessos', synchronize: false })
export class AccessEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, user => user)
  @JoinColumn({
    name: 'id_user',
    referencedColumnName: 'id',
  })
  user: UserEntity;

  @ManyToOne(() => ModulesEntity, module => module)
  @JoinColumn({
    name: 'id_modulo',
    referencedColumnName: 'id',
  })
  modulo: ModulesEntity;

  @Column({ type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  dtcadastro: Date;
}
