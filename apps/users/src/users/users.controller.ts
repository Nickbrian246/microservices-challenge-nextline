import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from '@app/contracts/users';
import { USERS_PATTERN } from '@app/contracts/users/message.pattern';
import { TypeOrmExceptionFilter } from '../exception-filters/type-orm-exception-filter';
@Controller()
@UseFilters(new TypeOrmExceptionFilter('TypeOrmExceptionFilter'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(USERS_PATTERN.CREATE_ONE)
  createOneUser(@Payload() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @MessagePattern(USERS_PATTERN.FIND_ALL)
  getUsers(@Payload() { limit, page }: { limit: number; page: number }) {
    return this.usersService.getUsers({ limit, page });
  }

  @MessagePattern(USERS_PATTERN.GET_BY_ID)
  getUserById(@Payload() id: string) {
    return this.usersService.getUserById(id);
  }

  @MessagePattern(USERS_PATTERN.UPDATE_BY_ID)
  updateUserById(@Payload() data: UpdateUserDto) {
    return this.usersService.updateUserById(+data.id, data.user);
  }

  @MessagePattern(USERS_PATTERN.DELETE_BY_ID)
  deleteUserById(@Payload() id: string) {
    return this.usersService.deleteUserById(id);
  }
}
