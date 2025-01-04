import { Injectable } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from '@app/contracts/tasks/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { DeleteResult, Repository } from 'typeorm';
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

  async create(createTasK: CreateTaskDto): Promise<ApiSuccessResponse<Task>> {
    const data = await this.TasksRepository.save({
      ...createTasK,
      userId: parseInt(createTasK.userId),
    });
    return { data };
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Task>> {
    const queryBuilder = this.TasksRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.title', 'DESC');

    const data = await paginate<Task>(queryBuilder, options);
    return { ...data };
  }

  async findOne(id: string): Promise<ApiSuccessResponse<Task>> {
    const data = await this.TasksRepository.findOne({
      where: { id: parseInt(id) },
    });

    return { data };
  }

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

  async remove(id: string): Promise<ApiSuccessResponse<DeleteResult>> {
    const data = await this.TasksRepository.delete(parseInt(id));
    return { data };
  }

  async deleteTasksByUserId(
    id: string,
  ): Promise<ApiSuccessResponse<DeleteResult>> {
    const data = await this.TasksRepository.delete({ userId: parseInt(id) });
    return { data };
  }
}
