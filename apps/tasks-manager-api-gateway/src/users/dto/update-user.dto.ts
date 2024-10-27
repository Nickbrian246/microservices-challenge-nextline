import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserWithoutIdAndEmail } from './user.dto';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @ValidateNested()
  @Type(() => UserWithoutIdAndEmail)
  user: UserWithoutIdAndEmail;

  @IsString()
  id: string;
}
