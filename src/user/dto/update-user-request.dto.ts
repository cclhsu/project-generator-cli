import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsObject,
  IsString,
  MinLength,
  isObject,
} from 'class-validator';
import { Expose } from 'class-transformer';

export class UpdateUserRequestDTO {
  constructor(
    email: string,
    phone: string,
    username: string,
    password: string,
  ) {
    this.email = email;
    this.phone = phone;
    this.username = username;
    this.password = password;
  }
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string;
}
