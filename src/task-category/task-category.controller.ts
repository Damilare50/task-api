import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TaskCategoryService } from './task-category.service';
import { Auth } from '../general/decorators/auth.decorator';
import { AuthGuard } from '../general/guard/auth.guard';
import { User as AuthUser } from '../general/decorators/user.decorator';
import { User } from '@prisma/client';
import { MongoIdDto, ResponseDto } from '../general/dto';
import { ListTaskCategoryFilterDto, TaskCategoryDto } from './dto';
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
  @ApiOperation({ summary: 'create task category' })
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
    @AuthUser() user: User,
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

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'list task categories' })
  @ApiOkResponse({
    description: 'task categories fetched successfully',
    type: ResponseDto<TaskCategoryDto[]>,
  })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({ description: 'unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'an unknown error occured' })
  @Auth(true)
  @UseGuards(AuthGuard)
  async list(
    @AuthUser() user: User,
    @Query() query: ListTaskCategoryFilterDto,
  ): Promise<ResponseDto<TaskCategoryDto[]>> {
    try {
      const response = await this.service.list(user, query);

      return {
        statusCode: HttpStatus.OK,
        data: response,
        message: 'task categories fetched successfully',
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

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'get task category by id' })
  @ApiOkResponse({
    description: 'task category fetched successfully',
    type: ResponseDto<TaskCategoryDto>,
  })
  @ApiNotFoundResponse({ description: 'task category not found' })
  @ApiUnauthorizedResponse({ description: 'unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'an unknown error occured' })
  @Auth(true)
  @UseGuards(AuthGuard)
  async getById(
    @AuthUser() user: User,
    @Param() id: MongoIdDto,
  ): Promise<ResponseDto<TaskCategoryDto>> {
    try {
      const response = await this.service.getById(id.id, user);

      return {
        statusCode: HttpStatus.OK,
        data: response,
        message: 'task category fetched successfully',
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

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'update task category by id' })
  @ApiOkResponse({
    description: 'task category updated successfully',
    type: ResponseDto<void>,
  })
  @ApiNotFoundResponse({ description: 'task category not found' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({ description: 'unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'an unknown error occured' })
  @Auth(true)
  @UseGuards(AuthGuard)
  async update(
    @AuthUser() user: User,
    @Param() id: MongoIdDto,
    @Body() dto: CreateTaskCategoryDto,
  ): Promise<ResponseDto<TaskCategoryDto>> {
    try {
      const response = await this.service.update(id.id, dto, user);

      return {
        statusCode: HttpStatus.OK,
        data: response,
        message: 'task category updated successfully',
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

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'delete task category by id' })
  @ApiOkResponse({
    description: 'task category deleted successfully',
    type: ResponseDto<TaskCategoryDto>,
  })
  @ApiNotFoundResponse({ description: 'task category not found' })
  @ApiUnauthorizedResponse({ description: 'unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'an unknown error occured' })
  @Auth(true)
  @UseGuards(AuthGuard)
  async delete(
    @AuthUser() user: User,
    @Param() id: MongoIdDto,
  ): Promise<ResponseDto<void>> {
    try {
      const response = await this.service.delete(id.id, user);

      return {
        statusCode: HttpStatus.OK,
        data: response,
        message: 'task category deleted successfully',
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
