import { IsNotEmpty } from 'class-validator';
import { IUpdateUser } from 'src/domain/dto/user/update_user.dto';

export class UpdateUserDTO implements IUpdateUser {
  @IsNotEmpty({ message: 'O campo ID é obrigatório' })
  id: number;

  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  nome: string;

  @IsNotEmpty({ message: 'O campo sobrenome é obrigatório' })
  sobrenome: string;

  @IsNotEmpty({ message: 'O campo email é obrigatório' })
  email: string;

  senha: string;

  @IsNotEmpty({ message: 'O campo modules é obrigatório' })
  modules: number[];

  @IsNotEmpty({ message: 'O campo perms é obrigatório' })
  perms: string;
}
