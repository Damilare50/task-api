import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { TaskCategoryModule } from './task-category/task-category.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, UserModule, TaskModule, TaskCategoryModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
