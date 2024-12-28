import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

export class TaskDto {
  @ApiProperty({ description: 'task id' })
  id: string;

  @ApiProperty({ description: 'task title' })
  title: string;

  @ApiProperty({ description: 'task details' })
  details: string;

  @ApiProperty({ description: 'task category' })
  category: string;

  @ApiProperty({ description: 'task created at' })
  createdAt: Date;

  @ApiProperty({ description: 'task updated at' })
  updatedAt: Date;
}
