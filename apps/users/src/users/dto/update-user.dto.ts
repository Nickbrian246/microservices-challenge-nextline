import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserDto } from './user.dto';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @ValidateNested()
  @Type(() => UserDto)
  user: UserDto;

  @IsString()
  id: string;
}
