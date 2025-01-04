import {
  ArgumentsHost,
  Catch,
  Logger,
  RpcExceptionFilter,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { QueryFailedError, TypeORMError } from 'typeorm';

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
    throw new RpcException(
      // @ts-ignore
      `${exception.driverError.code}, ${exception.message}`,
    );
  }
}
