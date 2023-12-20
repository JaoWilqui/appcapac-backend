import * as bcrypt from 'bcrypt';
import { IBcryptService } from 'src/domain/services/bcrypt.service';

export class BcryptService implements IBcryptService {
  constructor() {}

  async encrypt(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
