import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpError } from '../types/types';

export const errorsWithCodeActions: Record<
  string,
  (message?: string, context?: string) => HttpError
> = {
  ER_DUP_ENTRY: (message?: string, context?: string) => {
    return {
      message: `duplicated field, context:${context}`,
      status: HttpStatus.BAD_REQUEST,
    };
  },
};

export const errorsWithMessageActions: Record<
  string,
  (message?: string, context?: string) => HttpError
> = {
  'User not found': (message?: string, context?: string) => {
    return {
      message: `User not found ,context: ${context}`,
      status: HttpStatus.BAD_REQUEST,
    };
  },
};
