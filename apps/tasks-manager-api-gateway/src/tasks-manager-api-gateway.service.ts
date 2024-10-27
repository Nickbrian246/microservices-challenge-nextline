import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksManagerApiGatewayService {
  getHello(): string {
    return 'Hello World!';
  }
}
