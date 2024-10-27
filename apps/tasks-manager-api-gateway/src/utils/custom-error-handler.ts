import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  errorsWithCodeActions,
  errorsWithMessageActions,
} from './errors-actions';

@Injectable()
export class HandlerMicroServiceErrors {
  handleError(err: { message: string }): HttpException {
    let code = err.message.split(',')[0];

    if (errorsWithCodeActions[code]) return errorsWithCodeActions[code]();
    if (errorsWithMessageActions[code]) return errorsWithMessageActions[code]();

    return new HttpException(
      'hoo something went wrong!!!',
      HttpStatus.BAD_REQUEST,
    );
  }
}
