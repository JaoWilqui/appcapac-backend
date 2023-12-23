import { IPaginationDTO } from 'src/domain/dto/pagination.dto';
import { IUser } from 'src/domain/entities/user.entity';

export interface IFindAllUsersUsecase {
  findAllUsers(params: IPaginationDTO<IUser>): Promise<IPaginationDTO<IUser>>;
}
