import { Body, Controller, Post } from '@nestjs/common';
import { AuthUsecase } from 'src/application/usecases/auth.usecase';
import { ILogin } from 'src/domain/dto/auth/auth.dto';
import { Public } from '../../decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authUsecase: AuthUsecase) {}

  @Public()
  @Post('login')
  login(@Body() loginDto: ILogin) {
    return this.authUsecase.signIn(loginDto.email, loginDto.password);
  }
}
