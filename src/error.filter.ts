import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { AppError } from './application/error';

export class ErrorFilter implements ExceptionFilter {
  catch(err: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    console.log(err);

    return response.status(500).json({ message: 'Erro inesperado' });
  }
}
