import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TaskCategoryService } from './task-category.service';
import { Auth } from '../general/decorators/auth.decorator';
import { AuthGuard } from '../general/guard/auth.guard';
import { User as UserDecorator } from '../general/decorators/user.decorator';
import { User } from '@prisma/client';
import { ResponseDto } from '../general/dto';
import { TaskCategoryDto } from './dto';
import { CreateTaskCategoryDto } from './dto';
import { HttpException } from '@nestjs/common';
import { Logger } from '@nestjs/common';

@Controller('task-category')
@ApiTags('task-category')
@ApiBearerAuth('Authorization')
export class TaskCategoryController {
  private logger: Logger = new Logger(TaskCategoryController.name);

  constructor(private readonly service: TaskCategoryService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'category created successfully',
    type: ResponseDto<TaskCategoryDto>,
  })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({ description: 'unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'an unknown error occured' })
  @Auth(true)
  @UseGuards(AuthGuard)
  async create(
    @UserDecorator() user: User,
    @Body() dto: CreateTaskCategoryDto,
  ): Promise<ResponseDto<TaskCategoryDto>> {
    try {
      const response = await this.service.create(dto, user);

      return {
        statusCode: HttpStatus.OK,
        data: response,
        message: 'category created successfully',
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
