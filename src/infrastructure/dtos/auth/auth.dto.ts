import { IsNotEmpty } from 'class-validator';
import { ILogin } from 'src/domain/dto/auth/auth.dto';

export class LoginDTO implements ILogin {
  @IsNotEmpty({ message: 'Cpf é obrigatório' })
  cpf: string;

  @IsNotEmpty({ message: 'Senha é obrigatório' })
  password: string;
}
