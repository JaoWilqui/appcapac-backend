import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { AppError } from './application/error';

export class ErrorFilter implements ExceptionFilter {
  catch(err: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    console.log(err);

    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({ message: 'Erro inesperado' });
  }
}
