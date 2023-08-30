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

export class ProjectUserAnswerDTO {
  constructor(projectUser: string) {
    this.projectUser = projectUser;
  }

  @ApiProperty({
    description:
      'Project User ID is Unique identifier in the format "john.doe".',
    example: 'john.doe',
  })
  @Expose({ name: 'projectUser', toPlainOnly: true })
  @IsString({ message: 'Project User ID must be a string.' })
  @Matches(/^[a-z]+\.[a-z]+\d*$/, {
    message: 'Project User ID should follow the format "john.doe".',
  })
  projectUser: string;
}
