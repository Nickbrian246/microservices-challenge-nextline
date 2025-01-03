import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HandlerMicroServiceErrors } from '../utils/custom-error-handler';
//TODO CREAR KAFKA DOCKERFILE
//https://kafka.js.org/docs/running-kafka-in-development
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_CLIENT',
        transport: Transport.KAFKA,
        options: {
          client: { brokers: ['localhost:9092'], clientId: 'auth-gateway' },
          consumer: { groupId: 'auth-microservice' },
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, HandlerMicroServiceErrors],
})
export class AuthModule {}
