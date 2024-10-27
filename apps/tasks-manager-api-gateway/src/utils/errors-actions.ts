import { HttpException, HttpStatus } from '@nestjs/common';

export const errorsWithCodeActions: Record<string, () => HttpException> = {
  ER_DUP_ENTRY: (message?: string) => {
    return new HttpException(`dato repetido`, HttpStatus.BAD_REQUEST);
  },
};
