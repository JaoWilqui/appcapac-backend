import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorFilter } from './error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const whitelist: CorsOptions = { origin: ['http://localhost:4200'] };
  app.enableCors(whitelist);
  app.useGlobalFilters(new ErrorFilter());
  await app.listen(3000);
}
bootstrap();
