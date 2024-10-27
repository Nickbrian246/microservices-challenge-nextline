import { Controller, Get } from '@nestjs/common';
import { TasksManagerApiGatewayService } from './tasks-manager-api-gateway.service';

@Controller()
export class TasksManagerApiGatewayController {
  constructor(private readonly tasksManagerApiGatewayService: TasksManagerApiGatewayService) {}

  @Get()
  getHello(): string {
    return this.tasksManagerApiGatewayService.getHello();
  }
}
