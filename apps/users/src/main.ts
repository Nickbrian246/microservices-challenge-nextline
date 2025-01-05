import { NestFactory } from '@nestjs/core';
import { UsersAppModule } from './users-app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { v4 as uuid } from 'uuid';
import { Partitioners } from 'kafkajs';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersAppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: `user-${uuid()}`,
          brokers: ['localhost:9092'],
        },
        consumer: { groupId: 'users-microservice-group' },
        producer: {
          createPartitioner: Partitioners.LegacyPartitioner,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
