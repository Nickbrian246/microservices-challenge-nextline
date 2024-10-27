import { OmitType } from '@nestjs/mapped-types';
import { IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';

export class UserDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

export class UserWithoutIdAndEmail extends OmitType(UserDto, ['id', 'email']) {}
