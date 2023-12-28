import * as bcrypt from 'bcrypt';

export class Util {
  static async hash(string: string): Promise<string> {
    return await bcrypt.hash(string, 10);
  }

  static async compare(string: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(string, hash);
  }
}
