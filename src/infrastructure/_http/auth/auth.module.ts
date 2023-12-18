import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '18000s' },
    }),
  ],
  providers: [],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
