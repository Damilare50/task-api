import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskCategoryDto, TaskCategoryDto } from './dto';
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
}
