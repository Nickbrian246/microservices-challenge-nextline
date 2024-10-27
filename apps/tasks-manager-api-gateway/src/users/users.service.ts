import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { ClientProxy } from '@nestjs/microservices';
import { HandlerMicroServiceErrors } from '../utils/custom-error-handler';
import { catchError } from 'rxjs';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_CLIENT') private usersClient: ClientProxy,
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
    console.log({ m: id });

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
    return this.usersClient.send('users.deleteUserById', { id }).pipe(
      catchError((err) => {
        throw this.microserviceErrorHandler.handleError(err);
      }),
    );
  }
}
