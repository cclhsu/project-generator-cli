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
  DEFAULT_PROJECT_TEMPLATE_TYPE,
  PROJECT_TEMPLATE_TYPES,
  PROJECT_TEMPLATE_TYPE_ARRAY,
} from '../../../common/constant';

export class ProjectTypeAnswerDTO {
  constructor(
    projectType: PROJECT_TEMPLATE_TYPES = DEFAULT_PROJECT_TEMPLATE_TYPE,
  ) {
    this.projectType = projectType;
  }

  @ApiProperty({
    description: 'Project Type',
    example: PROJECT_TEMPLATE_TYPE_ARRAY,
    type: [String],
    default: DEFAULT_PROJECT_TEMPLATE_TYPE,
  })
  @Expose({ name: 'projectType', toPlainOnly: true })
  @IsEnum(PROJECT_TEMPLATE_TYPE_ARRAY, {
    message:
      'Invalid project type type. Allowed values: ' +
      PROJECT_TEMPLATE_TYPE_ARRAY.join(', '),
    context: {
      reason: 'projectType',
    },
  })
  projectType: PROJECT_TEMPLATE_TYPES;
}
