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
  DEFAULT_GIT_PROVIDER,
  GIT_PROVIDER_TYPES,
  GIT_PROVIDER_TYPE_ARRAY,
} from '../../../common/constant';

export class GitProviderAnswerDTO {
  constructor(gitProvider: GIT_PROVIDER_TYPES = DEFAULT_GIT_PROVIDER) {
    this.gitProvider = gitProvider;
  }

  @ApiProperty({
    description: 'Git provider',
    example: GIT_PROVIDER_TYPE_ARRAY,
    type: [String],
    default: DEFAULT_GIT_PROVIDER,
  })
  @Expose({ name: 'gitProvider', toPlainOnly: true })
  @IsEnum(GIT_PROVIDER_TYPE_ARRAY, {
    message:
      'Invalid git provider type. Allowed values: ' +
      GIT_PROVIDER_TYPE_ARRAY.join(', '),
    context: {
      reason: 'gitProvider',
    },
  })
  @IsOptional()
  gitProvider?: GIT_PROVIDER_TYPES;
}
