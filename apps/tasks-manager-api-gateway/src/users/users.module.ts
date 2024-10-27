import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { HandlerMicroServiceErrors } from '../utils/custom-error-handler';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_CLIENT',
        transport: Transport.TCP,
        options: { port: 3001 },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, HandlerMicroServiceErrors],
  exports: [UsersService],
})
export class UsersModule {}
