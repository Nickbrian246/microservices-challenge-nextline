import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserDto } from './user.dto';
import { Type } from 'class-transformer';
import { OmitType } from '@nestjs/mapped-types';

export class UserWithoutEmail extends OmitType(UserDto, ['email']) {}
export class UpdateUserDto {
  @ValidateNested()
  @Type(() => UserWithoutEmail)
  user: UserWithoutEmail;

  @IsString()
  id: string;
}
