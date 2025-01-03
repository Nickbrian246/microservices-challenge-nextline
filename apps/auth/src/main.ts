import { NestFactory } from '@nestjs/core';
import { AuthAppModule } from './auth-app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { v4 as uuid } from 'uuid';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthAppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: `auth-${uuid()}`,
          brokers: ['localhost:9092'],
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
