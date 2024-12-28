import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto, TaskDto } from './dto';
import { User } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateTaskDto, user: User): Promise<TaskDto> {
    let { categoryId, title, details } = data;
    const where = { userId: user.id };

    if (!categoryId) {
      const defaultCategory = await this.prismaService.taskCategory.findFirst({
        where: { ...where, name: 'default' },
      });

      categoryId = defaultCategory.id;
    }

    const category = await this.prismaService.taskCategory.findUnique({
      where: { ...where, id: categoryId },
    });

    if (!category) {
      throw new BadRequestException('category not found');
    }

    const _task = await this.prismaService.task.findFirst({
      where: { ...where, categoryId, title },
    });

    if (_task) {
      throw new BadRequestException('task already exists');
    }

    const task = await this.prismaService.task.create({
      data: {
        title,
        details,
        categoryId,
        userId: user.id,
      },
    });

    return {
      id: task.id,
      title: task.title,
      details: task.details,
      category: category.name,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}
