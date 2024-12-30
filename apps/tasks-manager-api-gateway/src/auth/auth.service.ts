import { Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ClientProxy } from '@nestjs/microservices';
import { HandlerMicroServiceErrors } from '../utils/custom-error-handler';
import { catchError } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_CLIENT') private tasksService: ClientProxy,
    private microserviceErrorHandler: HandlerMicroServiceErrors,
  ) {}
  create(createAuthDto: CreateAuthDto) {
    return this.tasksService.send('auth.create', createAuthDto).pipe(
      catchError((err) => {
        throw this.microserviceErrorHandler.handleError(err);
      }),
    );
  }

  findAll() {
    return this.tasksService.send('auth.findAll', {}).pipe(
      catchError((err) => {
        throw this.microserviceErrorHandler.handleError(err);
      }),
    );
  }

  findOne(id: number) {
    return this.tasksService.send('auth.findOne', id).pipe(
      catchError((err) => {
        throw this.microserviceErrorHandler.handleError(err);
      }),
    );
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return this.tasksService.send('auth.update', { id, ...updateAuthDto }).pipe(
      catchError((err) => {
        throw this.microserviceErrorHandler.handleError(err);
      }),
    );
  }

  remove(id: number) {
    return this.tasksService.send('auth.remove', id).pipe(
      catchError((err) => {
        throw this.microserviceErrorHandler.handleError(err);
      }),
    );
  }
}
