import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { HandlerMicroServiceErrors } from '../utils/custom-error-handler';
import { catchError, Observable, switchMap } from 'rxjs';
import { CreateUserDto, UpdateUserDto } from '@app/contracts/users';
import { USERS_PATTERN } from '@app/contracts/users/message.pattern';
import { TasksService } from '../tasks/tasks.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService implements OnModuleInit, OnModuleInit {
  constructor(
    @Inject('USERS_CLIENT') private usersClient: ClientKafka,
    private tasksService: TasksService,
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

  async onModuleDestroy() {
    await this.usersClient.close();
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
          throw this.microserviceErrorHandler.handleError(err);
        }),
      );
  }

  getUserById(id: string) {
    return this.usersClient.send(USERS_PATTERN.GET_BY_ID, id).pipe(
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

  deleteUserById(id: string): Observable<UserDto> {
    return this.usersClient.send(USERS_PATTERN.DELETE_BY_ID, id).pipe(
      catchError((err) => {
        throw this.microserviceErrorHandler.handleError(err);
      }),
    );
  }

  handleDeleteUserById(id: string) {
    return this.tasksService.deleteTasksByUserId(id).pipe(
      switchMap(() => this.deleteUserById(id)),
      catchError((err) => {
        throw this.microserviceErrorHandler.handleError(err);
      }),
    );
  }
}
