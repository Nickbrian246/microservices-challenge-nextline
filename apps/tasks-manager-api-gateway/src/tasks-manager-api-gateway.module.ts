import { Module } from '@nestjs/common';
import { TasksManagerApiGatewayController } from './tasks-manager-api-gateway.controller';
import { TasksManagerApiGatewayService } from './tasks-manager-api-gateway.service';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, TasksModule, AuthModule],
  controllers: [TasksManagerApiGatewayController],
  providers: [TasksManagerApiGatewayService],
})
export class TasksManagerApiGatewayModule {}
