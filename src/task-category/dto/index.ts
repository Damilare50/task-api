import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNotIn, IsOptional, IsString } from 'class-validator';

export class CreateTaskCategoryDto {
  @ApiProperty({ description: 'category name' })
  @IsNotEmpty()
  @IsNotIn(['default'])
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

export class ListTaskCategoryFilterDto {
  @ApiPropertyOptional({ description: 'category name' })
  @IsOptional()
  @IsString()
  name?: string;
}
