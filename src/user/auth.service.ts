import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IGetToken, IToken, IVerifyTokenResponse } from './interface';

@Injectable()
export class AuthService {
  private logger: Logger = new Logger(AuthService.name);

  constructor(private readonly jwtService: JwtService) {}

  getToken(data: IGetToken): string {
    const token: string = this.jwtService.sign(data);

    return token;
  }

  verifyToken(token: string): IVerifyTokenResponse {
    try {
      const decodedJwt: IToken = this.jwtService.verify(token);
      console.log(decodedJwt);

      return {
        isValid: true,
        payload: decodedJwt,
      };
    } catch (error) {
      this.logger.error(JSON.stringify(error));
      return {
        isValid: false,
      };
    }
  }
}
