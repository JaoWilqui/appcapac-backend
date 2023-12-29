import { IsNotEmpty } from 'class-validator';
import { ICreatetUser } from 'src/domain/dto/user/create_user.dto';
import { IAccess } from 'src/domain/entities/access.entity';

export class CreateUserDTO implements ICreatetUser {
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  nome: string;

  @IsNotEmpty({ message: 'O campo sobrenome é obrigatório' })
  sobrenome: string;

  @IsNotEmpty({ message: 'O campo email é obrigatório' })
  email: string;

  @IsNotEmpty({ message: 'O campo senha é obrigatório' })
  senha: string;

  @IsNotEmpty({ message: 'O campo access é obrigatório' })
  access: IAccess[];

  @IsNotEmpty({ message: 'O campo perms é obrigatório' })
  perms: string;
}
