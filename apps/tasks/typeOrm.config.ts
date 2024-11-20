import { ConfigService } from '@nestjs/config';
import { Task } from './src/tasks/entities/task.entity';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config();
const configService = new ConfigService();
export default new DataSource({
  type: 'mysql',
  host: configService.getOrThrow('MYSQL_TASKS_HOST'),
  port: configService.getOrThrow('MYSQL_TASKS_PORT'),
  username: configService.getOrThrow('MYSQL_TASKS_USERNAME'),
  password: configService.getOrThrow('MYSQL_TASKS_PASSWORD'),
  database: configService.getOrThrow('MYSQL_DATABASE_TASKS_DB_NAME'),
  migrations: [__dirname + '/migrations/**'],
  entities: [Task],
});
