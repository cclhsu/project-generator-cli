import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class GetUserByUsernameRequestDTO {
  constructor(username: string) {
    this.username = username;
  }

  @ApiProperty({
    description: 'Username of the user to retrieve.',
    example: 'johndoe',
  })
  @Expose({ name: 'username', toPlainOnly: true })
  @IsString({ message: 'Username must be a string.' })
  readonly username: string;
}
