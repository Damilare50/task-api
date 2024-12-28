import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty({ description: 'error field' })
  field: string;

  @ApiProperty({ description: 'error message' })
  message: string;
}

export class ResponseDto<T> {
  @ApiProperty({ description: 'response data' })
  data: T;

  @ApiProperty({ description: 'response message' })
  message: string;

  @ApiProperty({ description: 'response status code' })
  statusCode: HttpStatus;

  @ApiPropertyOptional({ description: 'response errors' })
  errors?: ErrorResponse[];
}
