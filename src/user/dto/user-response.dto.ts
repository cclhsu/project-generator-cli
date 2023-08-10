import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsString, MinLength } from 'class-validator';
// import { Transform, Type } from 'class-transformer';

export class UserResponseDTO {
  constructor(
    UUID: string,
    email: string,
    phone: string,
    username: string,
    // password: string,
    // hash: string,
    createTimestamp: Date,
    updateTimestamp: Date,
  ) {
    this.UUID = UUID;
    this.email = email;
    this.phone = phone;
    this.username = username;
    // this.password = password;
    // this.hash = hash;
    this.createTimestamp = createTimestamp;
    this.updateTimestamp = updateTimestamp;
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

  // @ApiProperty()
  // @IsString()
  // hash: string;

  @ApiProperty()
  @IsDateString()
  createTimestamp: Date;

  @ApiProperty()
  @IsDateString()
  updateTimestamp: Date;
}
