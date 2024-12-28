import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateTaskCategoryDto,
  ListTaskCategoryFilterDto,
  TaskCategoryDto,
} from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class TaskCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: CreateTaskCategoryDto,
    user: User,
  ): Promise<TaskCategoryDto> {
    const _category = await this.prisma.taskCategory.findFirst({
      where: { name: data.name, userId: user.id },
    });

    if (_category) {
      throw new BadRequestException('category already exists');
    }

    const category = await this.prisma.taskCategory.create({
      data: {
        name: data.name,
        userId: user.id,
      },
    });

    return {
      id: category.id,
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }

  async list(
    user: User,
    query: ListTaskCategoryFilterDto,
  ): Promise<TaskCategoryDto[]> {
    const where = {
      userId: user.id,
    };

    if (query.name) {
      where['name'] = {
        contains: query.name,
        mode: 'insensitive',
      };
    }

    const categories = await this.prisma.taskCategory.findMany({
      where,
    });

    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    }));
  }
}
