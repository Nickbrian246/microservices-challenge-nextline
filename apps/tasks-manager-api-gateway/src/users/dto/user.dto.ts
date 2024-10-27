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
