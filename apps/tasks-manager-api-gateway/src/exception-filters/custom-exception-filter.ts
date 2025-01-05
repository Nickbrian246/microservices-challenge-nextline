import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import {
  errorsWithCodeActions,
  errorsWithMessageActions,
} from '../utils/errors-actions';
import { HttpError } from '../types/types';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(CustomExceptionFilter.name);
  private context: string;
  constructor(context: string) {
    this.context = context;
  }
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    this.logger.error(` ${JSON.stringify(exception)}`);
    //@ts-ignore
    const { message, status } = this.buildError(exception);
    response.status(status).json({
      statusCode: status,
      message,
    });
  }

  buildError(err: { message: string }): HttpError {
    let code = err.message.split(',')[0];
    let contextError = err.message.split(',')[2];

    if (errorsWithCodeActions[code])
      return errorsWithCodeActions[code]('', this.context);
    if (errorsWithMessageActions[code])
      return errorsWithMessageActions[code]('', this.context);
    this.logger.error({ err });
    return {
      message: `hoo something went wrong!!! , ${this.context}`,
      status: HttpStatus.BAD_REQUEST,
    };
  }
}
