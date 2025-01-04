import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from '@app/contracts/tasks/dto';
import { TASKS_PATTERN } from '@app/contracts/tasks/dto';
import { TypeOrmExceptionFilter } from '../exception-filters/type-orm-exception-filter';
@Controller()
@UseFilters(new TypeOrmExceptionFilter('TypeOrmExceptionFilter'))
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @MessagePattern(TASKS_PATTERN.CREATE_TASK)
  create(@Payload() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @MessagePattern(TASKS_PATTERN.FIND_ALL)
  findAll(@Payload() { limit, page }: { limit: number; page: number }) {
    return this.tasksService.findAll({ limit, page });
  }

  @MessagePattern(TASKS_PATTERN.GET_BY_ID)
  findOne(@Payload() id: string) {
    return this.tasksService.findOne(id);
  }

  @MessagePattern(TASKS_PATTERN.UPDATE_BY_ID)
  update(@Payload() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(updateTaskDto.id, updateTaskDto);
  }

  @MessagePattern(TASKS_PATTERN.DELETE_BY_ID)
  remove(@Payload() id: string) {
    return this.tasksService.remove(id);
  }

  @MessagePattern(TASKS_PATTERN.DELETE_BY_USER_ID)
  deleteTasksByUserId(@Payload() id: string) {
    return this.tasksService.deleteTasksByUserId(id);
  }
}
