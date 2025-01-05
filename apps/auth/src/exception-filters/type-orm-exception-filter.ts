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
  private readonly logger = new Logger('TypeOrmExceptionFilter');
  constructor(context: string) {
    this.context = context;
  }
  catch(exception: QueryFailedError, host: ArgumentsHost): Observable<any> {
    this.logger.error({ exception, context: this.context });

    throw new RpcException(
      // @ts-ignore
      `${exception.driverError.code}, ${exception.message}, context: ${this.context}`,
    );
  }
}
