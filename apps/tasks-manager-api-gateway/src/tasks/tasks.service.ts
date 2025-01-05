import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
  CreateTaskDto,
  TASKS_PATTERN,
  UpdateTaskDto,
} from '@app/contracts/tasks/dto';
import { Observable } from 'rxjs';

@Injectable()
export class TasksService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject('TASKS_CLIENT') private tasksService: ClientKafka) {}

  async onModuleInit() {
    this.tasksService.subscribeToResponseOf(TASKS_PATTERN.CREATE_TASK);
    this.tasksService.subscribeToResponseOf(TASKS_PATTERN.FIND_ALL);
    this.tasksService.subscribeToResponseOf(TASKS_PATTERN.GET_BY_ID);
    this.tasksService.subscribeToResponseOf(TASKS_PATTERN.UPDATE_BY_ID);
    this.tasksService.subscribeToResponseOf(TASKS_PATTERN.DELETE_BY_ID);
    this.tasksService.subscribeToResponseOf(TASKS_PATTERN.DELETE_BY_USER_ID);
    await this.tasksService.connect();
  }

  async onModuleDestroy() {
    await this.tasksService.close();
  }

  create(createTaskDto: CreateTaskDto) {
    return this.tasksService.send(
      TASKS_PATTERN.CREATE_TASK,
      JSON.stringify(createTaskDto),
    );
  }

  findAll(page: number, limit: number) {
    return this.tasksService.send(
      TASKS_PATTERN.FIND_ALL,
      JSON.stringify({ page, limit }),
    );
  }

  findOne(id: number) {
    return this.tasksService.send(TASKS_PATTERN.GET_BY_ID, JSON.stringify(id));
  }

  update(updateTaskDto: UpdateTaskDto) {
    return this.tasksService.send(
      TASKS_PATTERN.UPDATE_BY_ID,
      JSON.stringify(updateTaskDto),
    );
  }

  remove(id: string) {
    return this.tasksService.send(
      TASKS_PATTERN.DELETE_BY_ID,
      JSON.stringify(id),
    );
  }

  deleteTasksByUserId(id: string): Observable<CreateTaskDto> {
    return this.tasksService.send(TASKS_PATTERN.DELETE_BY_USER_ID, id);
  }
}
