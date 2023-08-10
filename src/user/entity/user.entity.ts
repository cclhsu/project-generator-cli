// import { User, Message, Chatroom } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsString, MinLength } from 'class-validator';
import { Expose } from 'class-transformer';

export class UserEntity {
  constructor(
    UUID: string,
    email: string,
    phone: string,
    username: string,
    password: string,
    // hash: string,
    createTimestamp: Date,
    updateTimestamp: Date,
  ) {
    this.UUID = UUID;
    this.Email = email;
    this.Phone = phone;
    this.Username = username;
    this.Password = password;
    // this.Hash = hash;
    this.CreateTimestamp = createTimestamp;
    this.UpdateTimestamp = updateTimestamp;
  }

  @ApiProperty()
  @Expose({ name: 'UUID', toPlainOnly: true })
  @IsString()
  UUID: string;

  @ApiProperty()
  @Expose({ name: 'email', toPlainOnly: true })
  @IsEmail()
  Email: string;

  @ApiProperty()
  @Expose({ name: 'phone', toPlainOnly: true })
  @IsString()
  Phone: string;

  @ApiProperty()
  @Expose({ name: 'username', toPlainOnly: true })
  @IsString()
  Username: string;

  @ApiProperty()
  @Expose({ name: 'password', toPlainOnly: true })
  @IsString()
  @MinLength(8)
  Password: string;

  // @ApiProperty()
  // @Expose({ name: 'hashedPassword', toPlainOnly: true })
  // @IsString()
  // Hash: string;

  @ApiProperty()
  @Expose({ name: 'createTimestamp', toPlainOnly: true })
  @IsDateString()
  CreateTimestamp: Date;

  @ApiProperty()
  @Expose({ name: 'updateTimestamp', toPlainOnly: true })
  @IsDateString()
  UpdateTimestamp: Date;
}
