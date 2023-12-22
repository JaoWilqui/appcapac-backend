import { IInsertUser } from '../dto/user/insert_user.dto';

export interface IInsertUserUsecase {
  insertUser(user: IInsertUser): Promise<any>;
}
