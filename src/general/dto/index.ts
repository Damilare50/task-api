export class ErrorResponse {
  field: string;

  message: string;
}

export class ResponseDto<T> {
  data: T;
  message: string;
  statusCode: number;
  errors?: ErrorResponse[];
}
