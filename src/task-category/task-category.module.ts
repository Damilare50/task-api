import { Module } from '@nestjs/common';
import { TaskCategoryService } from './task-category.service';
import { TaskCategoryController } from './task-category.controller';

@Module({
  providers: [TaskCategoryService],
  controllers: [TaskCategoryController],
  exports: [TaskCategoryService],
})
export class TaskCategoryModule {}
