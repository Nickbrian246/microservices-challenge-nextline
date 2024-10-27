import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Task } from './task-dto';
import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class TaskWithoutId extends OmitType(Task, ['id']) {}
export class UpdateTaskDto {
  @IsString()
  id: string;

  @ValidateNested()
  @Type(() => TaskWithoutId)
  updateTaskDto: TaskWithoutId;
}
