import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { HandlerMicroServiceErrors } from '../utils/custom-error-handler';
import { catchError, switchMap } from 'rxjs';
import { UserWithoutIdAndEmail } from './dto/user.dto';
import { CreateUserDto, UpdateUserDto } from '@app/contracts/users';
import { USERS_PATTERN } from '@app/contracts/users/message.pattern';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @Inject('USERS_CLIENT') private usersClient: ClientKafka,
    private microserviceErrorHandler: HandlerMicroServiceErrors,
  ) {}

  async onModuleInit() {
    this.usersClient.subscribeToResponseOf(USERS_PATTERN.CREATE_ONE);
    this.usersClient.subscribeToResponseOf(USERS_PATTERN.FIND_ALL);
    this.usersClient.subscribeToResponseOf(USERS_PATTERN.GET_BY_ID);
    this.usersClient.subscribeToResponseOf(USERS_PATTERN.UPDATE_BY_ID);
    this.usersClient.subscribeToResponseOf(USERS_PATTERN.DELETE_BY_ID);
    await this.usersClient.connect();
  }

  createUser(user: CreateUserDto) {
    return this.usersClient
      .send(USERS_PATTERN.CREATE_ONE, JSON.stringify(user))
      .pipe(
        catchError((err) => {
          throw this.microserviceErrorHandler.handleError(err);
        }),
      );
  }

  getAllUsers(page: number, limit: number) {
    return this.usersClient
      .send(USERS_PATTERN.FIND_ALL, JSON.stringify({ page, limit }))
      .pipe(
        catchError((err) => {
          console.log(err, 'desde el error');

          throw this.microserviceErrorHandler.handleError(err);
        }),
      );
  }

  getUserById(id: string) {
    return this.usersClient
      .send(USERS_PATTERN.GET_BY_ID, JSON.stringify(id))
      .pipe(
        catchError((err) => {
          throw this.microserviceErrorHandler.handleError(err);
        }),
      );
  }

  UpdateUserById(user: UpdateUserDto) {
    return this.usersClient
      .send(USERS_PATTERN.UPDATE_BY_ID, JSON.stringify({ user }))
      .pipe(
        catchError((err) => {
          throw this.microserviceErrorHandler.handleError(err);
        }),
      );
  }

  deleteUserById(id: string) {
    return this.usersClient
      .send(USERS_PATTERN.DELETE_BY_ID, JSON.stringify(id))
      .pipe(
        catchError((err) => {
          throw this.microserviceErrorHandler.handleError(err);
        }),
      );
  }
}
