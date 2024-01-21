import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'node-config-ts';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: config.JWT_SECRET,
      signOptions: {
        expiresIn: config.JWT_EXPIRY,
        issuer: 'taskmaster-api',
        algorithm: 'HS256',
        subject: 'JWT Token',
      },
      verifyOptions: { algorithms: ['HS256'] },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService],
  exports: [UserService, AuthService],
})
export class UserModule {}
