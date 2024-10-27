import { NestFactory } from '@nestjs/core';
import { TasksManagerApiGatewayModule } from './tasks-manager-api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(TasksManagerApiGatewayModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
