import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
// import { Transform, Type } from 'class-transformer';

export class UserCommandOptionsDTO {
  constructor(UUID: string, email: string, phone: string, username: string) {
    this.UUID = UUID;
    this.email = email;
    this.phone = phone;
    this.username = username;
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
}
