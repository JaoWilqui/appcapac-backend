import { IInsertUser } from '../dto/user/insert_user.dto';
import { IUser } from '../entities/user.entity';

export interface IUserRepository {
  findByEmail(email: string): Promise<IUser>;
  updateContent(id: number, user: IInsertUser): Promise<void>;
  insert(user: IInsertUser): Promise<void>;
  findAll(): Promise<IUser[]>;
  findById(id: number): Promise<IUser>;
  deleteById(id: number): Promise<void>;
}
