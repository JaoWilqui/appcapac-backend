import { Body, Controller, Post } from '@nestjs/common';
import { AuthUsecase } from 'src/application/usecases/auth.usecase';
import { LoginDTO } from 'src/infrastructure/dtos/auth/auth.dto';
import { Public } from '../../decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authUsecase: AuthUsecase) {}

  @Public()
  @Post('')
  login(@Body() loginDto: LoginDTO) {
    return this.authUsecase.signIn(loginDto);
  }
}
