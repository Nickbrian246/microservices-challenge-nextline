import { RpcException } from '@nestjs/microservices';

export class CustomException extends RpcException {
  constructor(message: string) {
    super({ message });
  }
}
