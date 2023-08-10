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

export class UserCommandOptionsDTO {
  constructor(
    UUID: string,
    email: string,
    phone: string,
    username: string,
    // password: string,
  ) {
    this.UUID = UUID;
    this.email = email;
    this.phone = phone;
    this.username = username;
    // this.password = password;
  }

  @ApiProperty()
  @IsString()
  UUID: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  username: string;

  // @ApiProperty()
  // @IsString()
  // @MinLength(8)
  // password: string;
}
