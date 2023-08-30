import { Answers } from 'inquirer';
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

export const UUID_MSG: Answers = {
  regexp:
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
  message:
    'UUID is Unique identifier in the format "00000000-0000-0000-0000-000000000000".',
  example: 'e.g. 00000000-0000-0000-0000-000000000000',
  typeMessage: 'UUID must be a string',
  requiredMessage: 'Please enter an UUID',
  invalidMessage: 'Please enter a valid UUID',
  errorMessage:
    'Please enter a valid UUID format (e.g. 00000000-0000-0000-0000-000000000000)',
};

export class UuidAnswerDTO {
  constructor(UUID: string) {
    this.UUID = UUID;
  }

  @ApiProperty({
    description: UUID_MSG.message,
    example: UUID_MSG.example,
  })
  @Expose({ name: 'UUID', toPlainOnly: true })
  @IsNotEmpty({ message: UUID_MSG.requiredMessage })
  @IsString({ message: UUID_MSG.typeMessage })
  @IsUUID('all', { message: UUID_MSG.errorMessage })
  UUID: string;
}
