import { IPaginationDTO } from '../dto/pagination.dto';
import { IUpdateUser } from '../dto/user/update_user.dto';
import { IUser } from '../entities/user.entity';

export interface IUserRepository {
  findByEmail(email: string): Promise<IUser>;
  updateContent(id: number, user: IUpdateUser): Promise<void>;
  insert(user: IUser): Promise<void>;
  findAll(params: IPaginationDTO<IUser>): Promise<IPaginationDTO<IUser>>;
  findById(id: number): Promise<IUser>;
  deleteById(id: number): Promise<void>;
}
