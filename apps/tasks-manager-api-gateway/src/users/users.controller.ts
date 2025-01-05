import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  UseFilters,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { CustomExceptionFilter } from '../exception-filters/custom-exception-filter';

@Controller('users')
@UseFilters(new CustomExceptionFilter('auth'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    return this.usersService.getAllUsers(page, limit);
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Post()
  createOneUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @Put()
  updateUser(@Body() data: UpdateUserDto) {
    return this.usersService.UpdateUserById({
      id: data.id,
      user: {
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        id: data.id,
      },
    });
  }

  @Delete('/:id')
  deleteUserById(@Param('id') id: string) {
    return this.usersService.handleDeleteUserById(id);
  }
}
