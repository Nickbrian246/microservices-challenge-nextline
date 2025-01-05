import { NestFactory } from '@nestjs/core';
import { TasksAppModule } from './tasks-app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { v4 as uuid } from 'uuid';
import { Partitioners } from 'kafkajs';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TasksAppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: `tasks-${uuid()}`,
          brokers: ['localhost:9092'],
        },
        consumer: { groupId: 'tasks-microservice-group' },
        producer: {
          createPartitioner: Partitioners.LegacyPartitioner,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
