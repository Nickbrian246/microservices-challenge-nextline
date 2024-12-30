import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HandlerMicroServiceErrors } from '../utils/custom-error-handler';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_CLIENT',
        transport: Transport.TCP,
        options: { port: 3003 },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, HandlerMicroServiceErrors],
})
export class AuthModule {}
