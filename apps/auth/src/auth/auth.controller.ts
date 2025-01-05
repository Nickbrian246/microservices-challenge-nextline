import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { TypeOrmExceptionFilter } from '../exception-filters/type-orm-exception-filter';
import {
  CreateAuthDto,
  UpdateAuthDto,
  AUTH_PATTERN,
} from '@app/contracts/auth';

@Controller()
@UseFilters(new TypeOrmExceptionFilter('AuthController'))
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(AUTH_PATTERN.CREATE)
  create(@Payload() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @MessagePattern(AUTH_PATTERN.FIND_ALL)
  findAll() {
    return this.authService.findAll();
  }

  @MessagePattern(AUTH_PATTERN.FIND_ONE)
  findOne(@Payload() id: number) {
    return this.authService.findOne(id);
  }

  @MessagePattern(AUTH_PATTERN.UPDATE)
  update(@Payload() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(updateAuthDto.id, updateAuthDto);
  }

  @MessagePattern(AUTH_PATTERN.REMOVE)
  remove(@Payload() id: number) {
    return this.authService.remove(id);
  }
}
