import { Module } from '@nestjs/common';
import { TasksManagerApiGatewayController } from './tasks-manager-api-gateway.controller';
import { TasksManagerApiGatewayService } from './tasks-manager-api-gateway.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [TasksManagerApiGatewayController],
  providers: [TasksManagerApiGatewayService],
})
export class TasksManagerApiGatewayModule {}
