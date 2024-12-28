import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ErrorResponse } from '../dto';

export function validationPipeFactory(err: ValidationError[]) {
  return new HttpException(
    {
      data: null,
      message: 'Bad Request',
      errors: parseError(err),
      statusCode: HttpStatus.BAD_REQUEST,
    },
    HttpStatus.BAD_REQUEST,
  );
}

function parseError(
  err: ValidationError[],
  res: ErrorResponse[] = [],
): ErrorResponse[] {
  err.forEach((el: ValidationError) => {
    if (el?.children?.length === 0) {
      res.push({
        field: el.property,
        message: Object.values(el.constraints)?.toString(),
      });
    }
    return parseError(el?.children, res);
  });

  return res;
}
