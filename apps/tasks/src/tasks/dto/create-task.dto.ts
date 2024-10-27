import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Task } from './task-dto';

export class CreateTaskDto extends PartialType(OmitType(Task, ['id'])) {}
