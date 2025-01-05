import { CreateUserDto, UserWithoutEmail } from '@app/contracts/users';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { DeleteResult, Repository } from 'typeorm';
import { ApiSuccessResponse } from '../types/api-success-response';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto): Promise<ApiSuccessResponse<User>> {
    const data = await this.userRepository.save({ ...user });
    return { data };
  }

  async getUsers(options: IPaginationOptions): Promise<Pagination<User>> {
    const queryBuilder = this.userRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.firstName', 'DESC');
    const data = await paginate<User>(queryBuilder, options);

    return { ...data };
  }

  async getUserById(id: string): Promise<ApiSuccessResponse<User>> {
    const data = await this.userRepository.findOne({
      where: { id: +id },
    });

    return { data };
  }

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

  async deleteUserById(id: string): Promise<ApiSuccessResponse<DeleteResult>> {
    console.log({
      id,
      type: typeof id,
    });

    const data = await this.userRepository.delete({ id: +id });
    return { data };
  }
}
