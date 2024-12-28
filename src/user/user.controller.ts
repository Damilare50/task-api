import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginDto } from './dto';
import { ResponseDto } from '../general/dto';
import { ILoginResponse, IUser } from './interface';
import { Auth } from '../general/decorators/auth.decorator';
import { AuthGuard } from '../general/guard/auth.guard';
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
import { User } from 'src/general/decorators/user.decorator';

@Controller('user')
@ApiTags('user')
export class UserController {
  private logger: Logger = new Logger(UserController.name);

  constructor(private readonly service: UserService) {}

  @ApiOperation({ summary: 'create a new user' })
  @ApiOkResponse({ description: 'user created successfully' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiInternalServerErrorResponse({ description: 'an unknown error occured' })
  @HttpCode(HttpStatus.OK)
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<ResponseDto<IUser>> {
    try {
      const response = await this.service.createUser(dto);

      return {
        statusCode: HttpStatus.OK,
        data: response,
        message: 'user created successfully',
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

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'login user' })
  @ApiOkResponse({ description: 'user login successfully' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiNotFoundResponse({ description: 'user not found' })
  @ApiInternalServerErrorResponse({ description: 'an unknown error occured' })
  @Post('/login')
  async login(@Body() dto: LoginDto): Promise<ResponseDto<ILoginResponse>> {
    try {
      const response = await this.service.login(dto);

      return {
        statusCode: HttpStatus.OK,
        data: response,
        message: 'user login successfully',
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

  @HttpCode(HttpStatus.OK)
  @Auth(true)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'get user details' })
  @ApiBearerAuth('Authorization')
  @ApiOkResponse({ description: 'user created successfully' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({ description: 'unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'an unknown error occured' })
  @Get()
  async getUser(@User() user: IUser): Promise<ResponseDto<IUser>> {
    try {
      return {
        statusCode: HttpStatus.OK,
        data: user,
        message: 'user retrieved successfully',
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
