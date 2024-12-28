import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('task-category')
@ApiTags('task-category')
export class TaskCategoryController {}
