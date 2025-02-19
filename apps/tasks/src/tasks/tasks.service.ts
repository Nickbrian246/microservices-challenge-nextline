import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { DeleteResult, Repository } from 'typeorm';
import { errorHandler } from '../decorators/error-handler';
import { ApiSuccessResponse } from '../types/api-success-response';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly TasksRepository: Repository<Task>,
  ) {}

  @errorHandler()
  async create(createTasK: CreateTaskDto): Promise<ApiSuccessResponse<Task>> {
    const data = await this.TasksRepository.save({
      ...createTasK,
      userId: parseInt(createTasK.userId),
    });
    return { data };
  }

  @errorHandler()
  async findAll(options: IPaginationOptions): Promise<Pagination<Task>> {
    const queryBuilder = this.TasksRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.title', 'DESC');

    return paginate<Task>(queryBuilder, options);
  }

  @errorHandler()
  async findOne(id: string): Promise<ApiSuccessResponse<Task>> {
    const data = await this.TasksRepository.findOne({
      where: { id: parseInt(id) },
    });

    return { data };
  }

  @errorHandler()
  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<ApiSuccessResponse<Task>> {
    const {
      updateTaskDto: { description, state, title },
    } = updateTaskDto;

    await this.TasksRepository.update(parseInt(id), {
      description,
      state,
      title,
    });

    const data = await this.TasksRepository.findOne({
      where: { id: parseInt(id) },
    });

    return { data };
  }

  @errorHandler()
  async remove(id: string): Promise<ApiSuccessResponse<DeleteResult>> {
    const data = await this.TasksRepository.delete(parseInt(id));
    return { data };
  }

  @errorHandler()
  async deleteTasksByUserId(
    id: string,
  ): Promise<ApiSuccessResponse<DeleteResult>> {
    const data = await this.TasksRepository.delete({ userId: parseInt(id) });
    return { data };
  }
}
