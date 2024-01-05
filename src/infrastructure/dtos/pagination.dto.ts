import { IsNotEmpty, IsOptional } from 'class-validator';
import { IPaginationDTO, Order } from 'src/domain/dto/pagination.dto';

export class PaginationDTO<T> implements IPaginationDTO<any> {
  @IsOptional()
  data?: T[];

  @IsNotEmpty({ message: 'O campo page não pode ser vazio' })
  page?: number;

  @IsOptional()
  itemCount?: number;

  @IsNotEmpty({ message: 'O campo pageCount não pode ser vazio' })
  pageCount?: number;

  @IsNotEmpty({ message: 'O campo pageCount não pode ser vazio' })
  orderBy?: string;

  @IsOptional()
  order?: Order = Order.ASC;
}
