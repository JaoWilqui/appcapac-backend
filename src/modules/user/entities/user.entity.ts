import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"usuarios", synchronize: false})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    sobrenome: number;

    @Column()
    email: number;

    @Column()
    senha: number;

    @Column()
    dtcadastro: number;

    @Column()
    deletado: number;
}