import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @MessagePattern('tasks.createTask')
  create(@Payload() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @MessagePattern('tasks.findAll')
  findAll() {
    return this.tasksService.findAll();
  }

  @MessagePattern('tasks.getTaskById')
  findOne(@Payload() id: string) {
    return this.tasksService.findOne(id);
  }

  @MessagePattern('tasks.updateTaskById')
  update(@Payload() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(updateTaskDto.id, updateTaskDto);
  }

  @MessagePattern('tasks.deleteTaskById')
  remove(@Payload() id: string) {
    return this.tasksService.remove(id);
  }

  @MessagePattern('tasks.deleteTasksByUserId')
  deleteTasksByUserId(@Payload() id: string) {
    return this.tasksService.deleteTasksByUserId(id);
  }
}
