import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto, ListTaskFilterDto, TaskDto } from './dto';
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
      completed: task.completed,
      category: category.name,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }

  async list(user: User, dto: ListTaskFilterDto): Promise<TaskDto[]> {
    const where = { userId: user.id };
    const { categoryId, title, completed } = dto;
    if (categoryId) {
      where['categoryId'] = categoryId;
    }

    if (title) {
      where['title'] = { contains: title, mode: 'insensitive' };
    }

    if (completed !== undefined) {
      where['completed'] = completed;
    }

    const tasks = await this.prismaService.task.findMany({
      where,
      include: { category: true },
    });

    return tasks.map((task) => ({
      id: task.id,
      title: task.title,
      details: task.details,
      category: task.category.name,
      completed: task.completed,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    }));
  }

  async getById(id: string, user: User): Promise<TaskDto> {
    const where = { userId: user.id, id };

    const task = await this.prismaService.task.findUnique({
      where,
      include: { category: true },
    });

    if (!task) {
      throw new NotFoundException('task not found');
    }

    return {
      id: task.id,
      title: task.title,
      details: task.details,
      category: task.category.name,
      completed: task.completed,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}
