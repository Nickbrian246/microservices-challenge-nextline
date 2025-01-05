import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { HandlerMicroServiceErrors } from '../utils/custom-error-handler';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TasksModule } from '../tasks/tasks.module';
import { Partitioners } from 'kafkajs';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_CLIENT',
        transport: Transport.KAFKA,
        options: {
          client: { brokers: ['localhost:9092'], clientId: 'users-gateway' },
          consumer: { groupId: 'users-microservice' },
          producer: {
            createPartitioner: Partitioners.LegacyPartitioner,
          },
        },
      },
    ]),
    TasksModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, HandlerMicroServiceErrors],
  exports: [UsersService, UsersModule],
})
export class UsersModule {}
