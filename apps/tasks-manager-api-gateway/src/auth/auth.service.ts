import { AUTH_PATTERN, CreateAuthDto } from '@app/contracts/auth';
import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject('AUTH_CLIENT') private tasksService: ClientKafka) {}

  async onModuleInit() {
    this.tasksService.subscribeToResponseOf(AUTH_PATTERN.CREATE);
    this.tasksService.subscribeToResponseOf(AUTH_PATTERN.FIND_ALL);
    this.tasksService.subscribeToResponseOf(AUTH_PATTERN.FIND_ONE);
    this.tasksService.subscribeToResponseOf(AUTH_PATTERN.UPDATE);
    this.tasksService.subscribeToResponseOf(AUTH_PATTERN.REMOVE);
    await this.tasksService.connect();
  }
  async onModuleDestroy() {
    await this.tasksService.close();
  }
  create(createAuthDto: CreateAuthDto) {
    return this.tasksService.send(
      AUTH_PATTERN.CREATE,
      JSON.stringify(createAuthDto),
    );
  }

  findAll() {
    return this.tasksService.send(AUTH_PATTERN.FIND_ALL, {});
  }

  findOne(id: number) {
    return this.tasksService.send(AUTH_PATTERN.FIND_ONE, id);
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return this.tasksService.send(AUTH_PATTERN.UPDATE, {
      id,
      ...updateAuthDto,
    });
  }

  remove(id: number) {
    return this.tasksService.send(AUTH_PATTERN.REMOVE, id);
  }
}
