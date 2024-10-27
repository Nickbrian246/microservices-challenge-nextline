import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { ClientProxy } from '@nestjs/microservices';
import { HandlerMicroServiceErrors } from '../utils/custom-error-handler';
import { catchError } from 'rxjs';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASKS_CLIENT') private tasksService: ClientProxy,
    private microserviceErrorHandler: HandlerMicroServiceErrors,
  ) {}

  create(createTaskDto: CreateTaskDto) {
    return this.tasksService.send('tasks.createTask', createTaskDto).pipe(
      catchError((err) => {
        throw this.microserviceErrorHandler.handleError(err);
      }),
    );
  }

  findAll() {
    return this.tasksService.send('tasks.findAll', {}).pipe(
      catchError((err) => {
        throw this.microserviceErrorHandler.handleError(err);
      }),
    );
  }

  findOne(id: number) {
    return this.tasksService.send('tasks.getTaskById', id).pipe(
      catchError((err) => {
        throw this.microserviceErrorHandler.handleError(err);
      }),
    );
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.tasksService
      .send('tasks.updateTaskById', { id, updateTaskDto })
      .pipe(
        catchError((err) => {
          throw this.microserviceErrorHandler.handleError(err);
        }),
      );
  }

  remove(id: string) {
    return this.tasksService.send('tasks.deleteTaskById', id).pipe(
      catchError((err) => {
        throw this.microserviceErrorHandler.handleError(err);
      }),
    );
  }

  deleteTasksByUserId(id: string) {
    return this.tasksService.send('tasks.deleteTasksByUserId', id).pipe(
      catchError((err) => {
        throw this.microserviceErrorHandler.handleError(err);
      }),
    );
  }
}
