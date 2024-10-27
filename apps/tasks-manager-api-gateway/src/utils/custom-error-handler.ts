import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { errorsWithCodeActions } from './errors-actions';

@Injectable()
export class HandlerMicroServiceErrors {
  handleError(err: { message: string }): HttpException {
    let code = err.message.split(',')[0];
    if (errorsWithCodeActions[code]) return errorsWithCodeActions[code]();
    console.log(err);

    return new HttpException('ho no algo salio mal!!!', HttpStatus.BAD_REQUEST);
  }
}
