import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IGetToken } from './interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getToken(data: IGetToken): string {
    const token: string = this.jwtService.sign(data);

    return token;
  }

  verifyToken() {}
}
