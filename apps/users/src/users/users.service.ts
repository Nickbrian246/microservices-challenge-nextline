import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto';
import { ApiSuccessResponse } from '../types/api-success-response';
import { errorHandler } from '../decorators/error-handler';
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
  async getUsers(): Promise<ApiSuccessResponse<User[]>> {
    const data = await this.userRepository.find({});
    return { data };
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
    id: string,
    user: UserDto,
  ): Promise<ApiSuccessResponse<User>> {
    const updateResult = await this.userRepository.update(id, { ...user });

    if (updateResult.affected === 0) {
      throw new Error(`User with id ${id} not found`);
    }
    const data = await this.userRepository.findOne({
      where: { id: parseInt(id) },
    });

    return { data };
  }

  @errorHandler()
  async deleteUserById(id: string): Promise<ApiSuccessResponse<DeleteResult>> {
    const data = await this.userRepository.delete(parseInt(id));
    return { data };
  }
}
