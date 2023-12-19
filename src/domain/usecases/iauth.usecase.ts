import { ISignInResponseDto } from '../dto/auth/sign-in-response.dto';

export interface IAuthUseCase {
  signIn(email: string, password: string): Promise<ISignInResponseDto>;
}
