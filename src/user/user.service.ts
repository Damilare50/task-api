import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IUser } from './interface';
import { Prisma } from '@prisma/client';
import { Util } from '../general/util';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

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
}
