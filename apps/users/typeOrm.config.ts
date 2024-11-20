import { ConfigService } from '@nestjs/config';
import { User } from './src/users/entities/user.entity';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config();
const configService = new ConfigService();
export default new DataSource({
  type: 'mysql',
  host: configService.getOrThrow('MYSQL_USERS_HOST'),
  port: configService.getOrThrow('MYSQL_USERS_PORT'),
  username: configService.getOrThrow('MYSQL_USERS_USERNAME'),
  password: configService.getOrThrow('MYSQL_USERS_PASSWORD'),
  database: configService.getOrThrow('MYSQL_DATABASE_USERS_DB_NAME'),
  migrations: [__dirname + '/migrations/**'],
  entities: [User],
});
