import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashingService {
  async hashString(val: string): Promise<string> {
    return bcrypt.hash(val, 10);
  }

  async compareWithHashed(val: string, hash: string): Promise<boolean> {
    return bcrypt.compare(val, hash);
  }
}
