import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Task } from './task-dto';

export class UpdateTaskDto extends PartialType(OmitType(Task, ['id'])) {}
