import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  /**
   * Retrieves a task category by its ID for a specific user.
   *
   * @param id - The ID of the task category to retrieve.
   * @param user - The user object containing the user's ID.
   * @returns A promise that resolves to a TaskCategoryDto object containing the task category details.
   * @throws NotFoundException if the task category is not found.
   */
  async getById(id: string, user: User): Promise<TaskCategoryDto> {
    const category = await this.prisma.taskCategory.findFirst({
      where: { id, userId: user.id },
    });

    if (!category) {
      throw new NotFoundException('task category not found');
    }

    return {
      id: category.id,
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }

  async update(
    id: string,
    data: CreateTaskCategoryDto,
    user: User,
  ): Promise<TaskCategoryDto> {
    const category = await this.prisma.taskCategory.findFirst({
      where: { id, userId: user.id },
    });

    if (!category) {
      throw new NotFoundException('task category not found');
    }

    const updatedCategory = await this.prisma.taskCategory.update({
      where: { id },
      data: {
        name: data.name,
      },
    });

    return {
      id: updatedCategory.id,
      name: updatedCategory.name,
      createdAt: updatedCategory.createdAt,
      updatedAt: updatedCategory.updatedAt,
    };
  }

  async delete(id: string, user: User): Promise<void> {
    const category = await this.prisma.taskCategory.findFirst({
      where: { id, userId: user.id },
    });

    if (!category) {
      throw new NotFoundException('task category not found');
    }

    await this.prisma.taskCategory.delete({
      where: { id },
    });
  }
}
