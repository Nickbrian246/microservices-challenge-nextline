import { ArgumentsHost, Catch, RpcExceptionFilter } from '@nestjs/common';
import { ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';
import { Observable, throwError } from 'rxjs';
import { QueryFailedError, TypeORMError } from 'typeorm';
import { Logger } from '@nestjs/common';

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter
  implements RpcExceptionFilter<TypeORMError>
{
  private readonly context: string;
  constructor(context: string) {
    this.context = context;
  }
  private readonly logger = new Logger('TypeOrmExceptionFilter');
  catch(exception: QueryFailedError, host: ArgumentsHost): Observable<any> {
    this.logger.warn({ exception, context: this.context });

    throw new RpcException(
      // @ts-ignore
      `${exception.driverError.code}, ${exception.message}`,
    );
  }
}
