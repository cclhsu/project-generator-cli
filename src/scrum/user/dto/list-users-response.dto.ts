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
import { UserResponseDTO } from './user-response.dto';

export class ListUserResponseDTO {
  constructor(users: UserResponseDTO[]) {
    this.users = users;
  }

  @ApiProperty({ type: () => UserResponseDTO, isArray: true })
  @Expose({ name: 'users', toPlainOnly: true })
  @IsArray()
  @ValidateNested({ each: true })
  readonly users: UserResponseDTO[];
}
