import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TaskService } from './task.service';
import { Auth } from '../general/decorators/auth.decorator';
import { User as AuthUser } from '../general/decorators/user.decorator';
import { AuthGuard } from '../general/guard/auth.guard';
import { User } from '@prisma/client';
import { CreateTaskDto, TaskDto } from './dto';
import { ResponseDto } from '../general/dto';

@Controller('task')
@ApiTags('task')
@ApiBearerAuth('Authorization')
export class TaskController {
  private logger: Logger = new Logger(TaskController.name);

  constructor(private readonly service: TaskService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'create task' })
  @ApiOkResponse({
    description: 'task created successfully',
    type: ResponseDto<TaskDto>,
  })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({ description: 'unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'an unknown error occured' })
  @Auth(true)
  @UseGuards(AuthGuard)
  async create(
    @AuthUser() user: User,
    @Body() dto: CreateTaskDto,
  ): Promise<ResponseDto<TaskDto>> {
    try {
      const response = await this.service.create(dto, user);

      return {
        message: 'task created successfully',
        data: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      this.logger.error(JSON.stringify(error));

      if (error instanceof HttpException) throw error;

      throw new HttpException(
        error.message || 'an unknown error occured',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
