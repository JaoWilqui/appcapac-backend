import { ILogin } from '../dto/auth/auth.dto';
import { ISignInResponseDto } from '../dto/auth/sign-in-response.dto';

export interface IAuthUseCase {
  signIn(login: ILogin): Promise<ISignInResponseDto>;
}
