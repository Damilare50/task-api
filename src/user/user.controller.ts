import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginDto } from './dto';
import { ResponseDto } from '../general/dto';
import { ILoginResponse, IUser } from './interface';

@Controller('user')
export class UserController {
  private logger: Logger = new Logger(UserController.name);
  constructor(private readonly service: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<ResponseDto<IUser>> {
    try {
      const response = await this.service.createUser(dto);

      return {
        statusCode: HttpStatus.OK,
        data: response,
        message: 'User created successfully',
      };
    } catch (error) {
      this.logger.error(JSON.stringify(error));

      if (error instanceof HttpException) throw error;

      throw new HttpException(
        error.message || 'An unknown error occured',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() dto: LoginDto): Promise<ResponseDto<ILoginResponse>> {
    try {
      const response = await this.service.login(dto);

      return {
        statusCode: HttpStatus.OK,
        data: response,
        message: 'User login successfully',
      };
    } catch (error) {
      this.logger.error(JSON.stringify(error));

      if (error instanceof HttpException) throw error;

      throw new HttpException(
        error.message || 'An unknown error occured',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
