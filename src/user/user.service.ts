import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ILoginResponse, IUser } from './interface';
import { Prisma, User } from '@prisma/client';
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

    await this.prismaService.taskCategory.create({
      data: {
        name: 'default',
        userId: user.id,
      },
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
      throw new UnauthorizedException(`invalid credentials.`);
    }

    const isPasswordValid = await Util.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(`invalid credentials.`);
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

  async getUserById(id: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: { id },
    });

    return user;
  }
}
