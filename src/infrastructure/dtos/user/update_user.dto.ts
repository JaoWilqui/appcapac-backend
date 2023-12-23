import { IsNotEmpty } from 'class-validator';
import { IUpdateUser } from 'src/domain/dto/user/update_user.dto';
import { IAccess } from 'src/domain/entities/access.entity';

export class UpdateUserDTO implements IUpdateUser {
  @IsNotEmpty({ message: 'O campo ID é obrigatório' })
  id: number;

  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  nome: string;

  @IsNotEmpty({ message: 'O campo sobrenome é obrigatório' })
  sobrenome: string;

  @IsNotEmpty({ message: 'O campo email é obrigatório' })
  email: string;

  @IsNotEmpty({ message: 'O campo senha é obrigatório' })
  senha: string;

  @IsNotEmpty({ message: 'O campo dtcadastro é obrigatório' })
  dtcadastro: Date;

  @IsNotEmpty({ message: 'O campo access é obrigatório' })
  access: IAccess[];

  deletado?: string;

  @IsNotEmpty({ message: 'O campo perms é obrigatório' })
  perms: string;
}
