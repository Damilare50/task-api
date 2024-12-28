import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The name of the User' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The email of the User' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The password of the User' })
  password: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The email of the User' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The password of the User' })
  password: string;
}
