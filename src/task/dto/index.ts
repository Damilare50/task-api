import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: 'task category id' })
  @IsOptional()
  @IsMongoId()
  categoryId: string;

  @ApiProperty({ description: 'task title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'task details' })
  @IsNotEmpty()
  @IsString()
  details: string;
}

export class UpdateTaskDto {
  @ApiProperty({ description: 'task title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'task details' })
  @IsOptional()
  @IsString()
  details?: string;

  @ApiProperty({ description: 'task completion status' })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}

export class TaskDto {
  @ApiProperty({ description: 'task id' })
  id: string;

  @ApiProperty({ description: 'task title' })
  title: string;

  @ApiProperty({ description: 'task details' })
  details: string;

  @ApiProperty({ description: 'task category' })
  category: string;

  @ApiProperty({ description: 'task completion status' })
  completed: boolean;

  @ApiProperty({ description: 'task created at' })
  createdAt: Date;

  @ApiProperty({ description: 'task updated at' })
  updatedAt: Date;
}

export class ListTaskFilterDto {
  @ApiPropertyOptional({ description: 'task category id' })
  @IsOptional()
  @IsMongoId()
  categoryId?: string;

  @ApiPropertyOptional({ description: 'task title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'task completion status' })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
