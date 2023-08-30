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
import { UserDTO } from '../../../scrum/user/dto';

export class UsersAnswerDTO {
  constructor(users: UserDTO[]) {
    this.users = users;
  }

  @ApiProperty({
    description: 'An array of user DTOs.',
    type: () => UserDTO,
    isArray: true,
  })
  @Expose({ name: 'users', toPlainOnly: true })
  @IsArray({ message: 'Users must be an array' })
  @ValidateNested({ each: true })
  users: UserDTO[];
}
