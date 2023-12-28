import * as bcrypt from 'bcrypt';

export class Util {
  static async hash(string: string) {
    return await bcrypt.hash(string, 10);
  }
}
