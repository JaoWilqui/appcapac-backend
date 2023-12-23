import { ICreatetUser } from '../../dto/user/create_user.dto';

export interface ICreateUserUsecase {
  insertUser(user: ICreatetUser): Promise<any>;
}
