// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import {
//   errorsWithCodeActions,
//   errorsWithMessageActions,
// } from './errors-actions';
// import { Logger } from '@nestjs/common';
// @Injectable()
// export class HandlerMicroServiceErrors {
//   private readonly logger = new Logger('HandlerMicroServiceErrors gateway');
//   handleError(err: { message: string }): HttpException {
//     console.log({ err }, 'err');
//     let code = err.message.split(',')[0];

//     if (errorsWithCodeActions[code]) return errorsWithCodeActions[code]();
//     if (errorsWithMessageActions[code]) return errorsWithMessageActions[code]();
//     this.logger.error({ err });
//     return new HttpException(
//       'hoo something went wrong!!!',
//       HttpStatus.BAD_REQUEST,
//     );
//   }
// }
