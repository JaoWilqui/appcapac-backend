import { IsNotEmpty } from 'class-validator';
import { ILogin } from 'src/domain/dto/auth/auth.dto';

export class LoginDTO implements ILogin {
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @IsNotEmpty({ message: 'Senha é obrigatório' })
  password: string;
}
