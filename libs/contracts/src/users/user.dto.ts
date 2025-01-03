import { IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  id: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
