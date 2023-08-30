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
import {
  PROJECT_LANGUAGE_TYPES,
  DEFAULT_PROJECT_LANGUAGE,
  PROJECT_LANGUAGE_TYPE_ARRAY,
} from '../../../common/constant';

export class ProjectLanguageAnswerDTO {
  constructor(
    projectLanguage: PROJECT_LANGUAGE_TYPES = DEFAULT_PROJECT_LANGUAGE,
  ) {
    this.projectLanguage = projectLanguage;
  }

  @ApiProperty({
    description: 'Project Language',
    example: PROJECT_LANGUAGE_TYPE_ARRAY,
    type: [String],
    default: DEFAULT_PROJECT_LANGUAGE,
  })
  @Expose({ name: 'projectLanguage', toPlainOnly: true })
  @IsEnum(PROJECT_LANGUAGE_TYPE_ARRAY, {
    message:
      'Invalid project language type. Allowed values: ' +
      PROJECT_LANGUAGE_TYPE_ARRAY.join(', '),
    context: {
      reason: 'projectLanguage',
    },
  })
  projectLanguage: PROJECT_LANGUAGE_TYPES;
}
