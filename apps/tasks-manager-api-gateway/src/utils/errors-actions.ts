import { HttpException, HttpStatus } from '@nestjs/common';

export const errorsWithCodeActions: Record<string, () => HttpException> = {
  ER_DUP_ENTRY: (message?: string) => {
    return new HttpException(`duplicated field`, HttpStatus.BAD_REQUEST);
  },
};

export const errorsWithMessageActions: Record<string, () => HttpException> = {
  'User not found': (message?: string) => {
    return new HttpException(`User not found `, HttpStatus.BAD_REQUEST);
  },
};
