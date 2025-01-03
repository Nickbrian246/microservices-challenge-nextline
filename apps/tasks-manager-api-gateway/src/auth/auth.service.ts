import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

import { UpdateAuthDto } from './dto/update-auth.dto';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { HandlerMicroServiceErrors } from '../utils/custom-error-handler';
import { catchError } from 'rxjs';
import { CreateAuthDto, AUTH_PATTERN } from '@app/contracts/auth';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @Inject('AUTH_CLIENT') private tasksService: ClientKafka,
    private microserviceErrorHandler: HandlerMicroServiceErrors,
  ) {}

  async onModuleInit() {
    this.tasksService.subscribeToResponseOf(AUTH_PATTERN.CREATE);
    this.tasksService.subscribeToResponseOf(AUTH_PATTERN.FIND_ALL);
    this.tasksService.subscribeToResponseOf(AUTH_PATTERN.FIND_ONE);
    this.tasksService.subscribeToResponseOf(AUTH_PATTERN.UPDATE);
    this.tasksService.subscribeToResponseOf(AUTH_PATTERN.REMOVE);
    await this.tasksService.connect();
  }
  create(createAuthDto: CreateAuthDto) {
    console.log({ createAuthDto }, AUTH_PATTERN.CREATE);
    return this.tasksService
      .send(AUTH_PATTERN.CREATE, JSON.stringify(createAuthDto))
      .pipe(
        catchError((err) => {
          throw this.microserviceErrorHandler.handleError(err);
        }),
      );
  }

  findAll() {
    return this.tasksService.send(AUTH_PATTERN.FIND_ALL, {}).pipe(
      catchError((err) => {
        throw this.microserviceErrorHandler.handleError(err);
      }),
    );
  }

  findOne(id: number) {
    return this.tasksService.send(AUTH_PATTERN.FIND_ONE, id).pipe(
      catchError((err) => {
        throw this.microserviceErrorHandler.handleError(err);
      }),
    );
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return this.tasksService
      .send(AUTH_PATTERN.UPDATE, { id, ...updateAuthDto })
      .pipe(
        catchError((err) => {
          throw this.microserviceErrorHandler.handleError(err);
        }),
      );
  }

  remove(id: number) {
    return this.tasksService.send(AUTH_PATTERN.REMOVE, id).pipe(
      catchError((err) => {
        throw this.microserviceErrorHandler.handleError(err);
      }),
    );
  }
}
