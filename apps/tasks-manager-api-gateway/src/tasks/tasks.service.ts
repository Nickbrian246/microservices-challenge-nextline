import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { HandlerMicroServiceErrors } from '../utils/custom-error-handler';
import { catchError, map } from 'rxjs';
import { TASKS_PATTERN } from '@app/contracts/tasks/dto';
import { CreateTaskDto, UpdateTaskDto } from '@app/contracts/tasks/dto';

@Injectable()
export class TasksService implements OnModuleInit {
  constructor(
    @Inject('TASKS_CLIENT') private tasksService: ClientKafka,
    private microserviceErrorHandler: HandlerMicroServiceErrors,
  ) {}

  async onModuleInit() {
    this.tasksService.subscribeToResponseOf(TASKS_PATTERN.CREATE_TASK);
    this.tasksService.subscribeToResponseOf(TASKS_PATTERN.FIND_ALL);
    this.tasksService.subscribeToResponseOf(TASKS_PATTERN.GET_BY_ID);
    this.tasksService.subscribeToResponseOf(TASKS_PATTERN.UPDATE_BY_ID);
    this.tasksService.subscribeToResponseOf(TASKS_PATTERN.DELETE_BY_ID);
    this.tasksService.subscribeToResponseOf(TASKS_PATTERN.DELETE_BY_USER_ID);
    await this.tasksService.connect();
  }
  create(createTaskDto: CreateTaskDto) {
    return this.tasksService
      .send(TASKS_PATTERN.CREATE_TASK, createTaskDto)
      .pipe(
        catchError((err) => {
          throw this.microserviceErrorHandler.handleError(err);
        }),
      );
  }

  findAll(page: number, limit: number) {
    return this.tasksService
      .send(TASKS_PATTERN.FIND_ALL, JSON.stringify({ page: 10, limit: 1 }))
      .pipe(
        map((response) => {
          console.log(response, 'response from gateway');
          return response;
        }),
        catchError((err) => {
          throw this.microserviceErrorHandler.handleError(err);
        }),
      );
  }

  findOne(id: number) {
    return this.tasksService
      .send(TASKS_PATTERN.GET_BY_ID, JSON.stringify(id))
      .pipe(
        catchError((err) => {
          throw this.microserviceErrorHandler.handleError(err);
        }),
      );
  }

  update(updateTaskDto: UpdateTaskDto) {
    return this.tasksService
      .send(TASKS_PATTERN.UPDATE_BY_ID, JSON.stringify(updateTaskDto))
      .pipe(
        catchError((err) => {
          throw this.microserviceErrorHandler.handleError(err);
        }),
      );
  }

  remove(id: string) {
    return this.tasksService
      .send(TASKS_PATTERN.DELETE_BY_ID, JSON.stringify(id))
      .pipe(
        catchError((err) => {
          throw this.microserviceErrorHandler.handleError(err);
        }),
      );
  }

  deleteTasksByUserId(id: string) {
    return this.tasksService
      .send(TASKS_PATTERN.DELETE_BY_USER_ID, JSON.stringify(id))
      .pipe(
        catchError((err) => {
          throw this.microserviceErrorHandler.handleError(err);
        }),
      );
  }
}
