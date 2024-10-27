import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { ClientProxy } from '@nestjs/microservices';
import { HandlerMicroServiceErrors } from '../utils/custom-error-handler';
import { catchError, switchMap } from 'rxjs';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_CLIENT') private usersClient: ClientProxy,
    @Inject('TASKS_CLIENT') private tasksClient: ClientProxy,
    private microserviceErrorHandler: HandlerMicroServiceErrors,
  ) {}

  createUser(user: CreateUserDto) {
    return this.usersClient.send('users.createOne', user).pipe(
      catchError((err) => {
        throw this.microserviceErrorHandler.handleError(err);
      }),
    );
  }

  getAllUsers() {
    return this.usersClient.send('users.findAll', {}).pipe(
      catchError((err) => {
        throw this.microserviceErrorHandler.handleError(err);
      }),
    );
  }

  getUserById(id: string) {
    return this.usersClient.send('users.getUserById', id).pipe(
      catchError((err) => {
        throw this.microserviceErrorHandler.handleError(err);
      }),
    );
  }

  UpdateUserById(user: UserDto, id: string) {
    return this.usersClient.send('users.updateUserById', { user, id }).pipe(
      catchError((err) => {
        throw this.microserviceErrorHandler.handleError(err);
      }),
    );
  }

  deleteUserById(id: string) {
    return this.tasksClient.send('tasks.deleteTasksByUserId', id).pipe(
      catchError((err) => {
        throw this.microserviceErrorHandler.handleError(err);
      }),
      switchMap(() => {
        return this.usersClient.send('users.deleteUserById', id).pipe(
          catchError((err) => {
            throw this.microserviceErrorHandler.handleError(err);
          }),
        );
      }),
    );
  }
}
