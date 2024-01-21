import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Auth } from '../decorators/auth.decorator';
import { Util } from '../util';
import { AuthService } from '../../user/auth.service';
import { IVerifyTokenResponse } from 'src/user/interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isAuthRequired: boolean = this.reflector.get(
      Auth,
      context.getHandler(),
    );

    if (!isAuthRequired) return true;

    const request = context.switchToHttp().getRequest();
    const auth: string = request.headers.authorization;

    if (!auth) throw new UnauthorizedException('User not authorized!');

    const token: string = Util.getTokenFromAuth(auth);

    const decodeResponse: IVerifyTokenResponse =
      this.authService.verifyToken(token);
    if (!decodeResponse.isValid)
      throw new UnauthorizedException('User nor authorized!');

    return true;
  }
}
