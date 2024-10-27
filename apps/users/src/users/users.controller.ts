import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('users.createOne')
  createOneUser(@Payload() user: CreateUserDto) {
    console.log({ payload: user });
    return this.usersService.createUser(user);
  }

  @MessagePattern('users.findAll')
  getUsers(@Payload() { limit, page }: { limit: number; page: number }) {
    return this.usersService.getUsers({ limit, page });
  }

  @MessagePattern('users.getUserById')
  getUserById(@Payload() id: string) {
    console.log(id);

    return this.usersService.getUserById(id);
  }

  @MessagePattern('users.updateUserById')
  updateUserById(@Payload() data: UpdateUserDto) {
    return this.usersService.updateUserById(data.id, data.user);
  }

  @MessagePattern('users.deleteUserById')
  deleteUserById(@Payload() id: string) {
    return this.usersService.deleteUserById(id);
  }
}
