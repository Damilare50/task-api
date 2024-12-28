import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskCategoryDto {
  @ApiProperty({ description: 'category name' })
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class TaskCategoryDto {
  @ApiProperty({ description: 'category id' })
  id: string;

  @ApiProperty({ description: 'category name' })
  name: string;

  @ApiProperty({ description: 'created at' })
  createdAt: Date;

  @ApiProperty({ description: 'updated at' })
  updatedAt: Date;
}
