import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersModule } from '../users/users.module';
import { HandlerMicroServiceErrors } from '../utils/custom-error-handler';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TASKS_CLIENT',
        transport: Transport.KAFKA,
        options: {
          client: { brokers: ['localhost:9092'], clientId: 'tasks-gateway' },
          consumer: { groupId: 'tasks-microservice' },
        },
      },
    ]),
    UsersModule,
  ],
  controllers: [TasksController],
  providers: [TasksService, HandlerMicroServiceErrors],
})
export class TasksModule {}
