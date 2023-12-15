import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'campanha', synchronize: false })
export class CampaingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200, nullable: false })
  nome: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  descricao: string;

  @Column({ type: 'date', nullable: false })
  dtcadastro: Date;

  @Column({ type: 'date', nullable: false })
  dtinicio: Date;

  @Column({ type: 'date', nullable: false })
  dtfim: Date;

  @Column({ type: 'char', length: 1, nullable: false })
  deletado: string;

  @Column({ type: 'int', length: 11, nullable: false })
  status: string;
}
