import { IPaginationDTO } from '../dto/pagination.dto';
import { IUser } from '../entities/user.entity';

export interface IUserRepository {
  findByCpf(cpf: string): Promise<IUser>;
  findByEmail(email: string): Promise<IUser>;
  updateContent(id: number, user: IUser): Promise<void>;
  insert(user: IUser): Promise<void>;
  findAll(params: IPaginationDTO<IUser>): Promise<IPaginationDTO<IUser>>;
  findById(id: number): Promise<IUser>;
  deleteById(id: number): Promise<void>;
}
