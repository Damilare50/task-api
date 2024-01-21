import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ILoginResponse, IUser } from './interface';
import { Prisma } from '@prisma/client';
import { Util } from '../general/util';
import { LoginDto } from './dto';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async createUser(data: Prisma.UserCreateInput): Promise<IUser> {
    const userExists = await this.prismaService.user.findFirst({
      where: { email: data.email },
    });

    if (userExists) {
      throw new BadRequestException(
        `User with email ${data.email} already exists.`,
      );
    }

    const hashedPass = await Util.hash(data.password);

    const user = await this.prismaService.user.create({
      data: { ...data, password: hashedPass },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async login(data: LoginDto): Promise<ILoginResponse> {
    const user = await this.prismaService.user.findFirst({
      where: { email: data.email },
    });

    if (!user) {
      throw new BadRequestException(`Invalid credentials.`);
    }

    const isPasswordValid = await Util.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException(`Invalid credentials.`);
    }

    const token: string = this.authService.getToken({
      userId: user.id,
      email: user.email,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token,
    };
  }

  async getUser(auth: string): Promise<IUser> {
    const token: string = Util.getTokenFromAuth(auth);

    const { payload } = this.authService.verifyToken(token);

    const user = await this.prismaService.user.findFirst({
      where: { id: payload.userId },
    });

    if (!user) {
      throw new BadRequestException(`User with ${payload.userId} not found.`);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
