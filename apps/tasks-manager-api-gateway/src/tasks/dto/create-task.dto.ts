import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Task } from './task-dto';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TaskStatus } from '../types/tasks-status';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(TaskStatus)
  state: TaskStatus;
}
