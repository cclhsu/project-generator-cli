import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsObject,
  IsString,
  MinLength,
  isObject,
} from 'class-validator';
import { Expose } from 'class-transformer';

export class UserContentEntity {
  constructor(
    email: string,
    phone: string,
    lastName: string,
    firstName: string,
    projectRoles: string[],
    scrumRoles: string[],
    password: string,
  ) {
    this.email = email;
    this.phone = phone;
    this.lastName = lastName;
    this.firstName = firstName;
    this.projectRoles = projectRoles;
    this.scrumRoles = scrumRoles;
    this.password = password;
  }

  @ApiProperty()
  @Expose({ name: 'email', toPlainOnly: true })
  @IsEmail()
  email: string;

  @ApiProperty()
  @Expose({ name: 'phone', toPlainOnly: true })
  @IsString()
  phone: string;

  @ApiProperty()
  @Expose({ name: 'lastName', toPlainOnly: true })
  @IsString()
  lastName: string;

  @ApiProperty()
  @Expose({ name: 'firstName', toPlainOnly: true })
  @IsString()
  firstName: string;

  @ApiProperty()
  @Expose({ name: 'projectRoles', toPlainOnly: true })
  @IsArray()
  projectRoles: string[] = [];

  @ApiProperty()
  @Expose({ name: 'scrumRoles', toPlainOnly: true })
  @IsArray()
  scrumRoles: string[] = [];

  @ApiProperty()
  @Expose({ name: 'password', toPlainOnly: true })
  @IsString()
  @MinLength(8)
  password: string;

  // @ApiProperty()
  // @Expose({ name: 'hashedPassword', toPlainOnly: true })
  // @IsString()
  // Hash: string;

  // @ApiProperty()
  // @Expose({ name: 'use2FA', toPlainOnly: true })
  // @IsString()
  // use2FA: boolean = false;
}
