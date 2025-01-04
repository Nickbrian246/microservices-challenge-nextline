import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UserWithoutEmail } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto';
import { ApiSuccessResponse } from '../types/api-success-response';
import { errorHandler } from '../decorators/error-handler';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  @errorHandler()
  async createUser(user: CreateUserDto): Promise<ApiSuccessResponse<User>> {
    const data = await this.userRepository.save({ ...user });
    return { data };
  }

  @errorHandler()
  async getUsers(options: IPaginationOptions): Promise<Pagination<User>> {
    const queryBuilder = this.userRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.firstName', 'DESC');
    const data = await paginate<User>(queryBuilder, options);

    return { ...data };
  }

  @errorHandler()
  async getUserById(id: string): Promise<ApiSuccessResponse<User>> {
    const data = await this.userRepository.findOne({
      where: { id: parseInt(id) },
    });

    return { data };
  }

  @errorHandler()
  async updateUserById(
    id: number,
    user: UserWithoutEmail,
  ): Promise<ApiSuccessResponse<User>> {
    const { firstName, lastName } = user;
    const updateResult = await this.userRepository.update(+id, {
      lastName,
      firstName,
    });

    if (updateResult.affected === 0) {
      throw new Error(`User with id ${id} not found`);
    }
    const data = await this.userRepository.findOne({
      where: { id },
    });

    return { data };
  }

  @errorHandler()
  async deleteUserById(id: string): Promise<ApiSuccessResponse<DeleteResult>> {
    const data = await this.userRepository.delete(parseInt(id));
    return { data };
  }
}
