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
  private readonly logger = new Logger('TypeOrmExceptionFilter');
  constructor(context: string) {
    this.context = context;
  }
  catch(exception: QueryFailedError, host: ArgumentsHost): Observable<any> {
    this.logger.error({ exception });
    throw new RpcException(
      // @ts-ignore
      `${exception.driverError.code}, ${exception.message}, context: ${this.context}`,
    );
  }
}
