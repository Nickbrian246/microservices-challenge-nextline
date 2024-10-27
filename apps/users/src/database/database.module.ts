import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('MYSQL_USERS_HOST'),
        port: configService.getOrThrow('MYSQL_USERS_PORT'),
        username: configService.getOrThrow('MYSQL_USERS_USERNAME'),
        password: configService.getOrThrow('MYSQL_USERS_PASSWORD'),
        database: configService.getOrThrow('MYSQL_DATABASE_USERS_DB_NAME'),
        autoLoadEntities: true,
        synchronize: configService.getOrThrow('MYSQL_SYNCHRONIZE'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
