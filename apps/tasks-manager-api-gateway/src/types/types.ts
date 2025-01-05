import { HttpStatus } from '@nestjs/common';

export interface HttpError {
  message: string;
  status: HttpStatus;
}
