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

export class ConfigPathAnswerDTO {
  constructor(configPath: string) {
    this.configPath = configPath;
  }

  @ApiProperty({
    description: 'The path to the configuration file.',
    example: '/path/to/config.json',
  })
  @IsString()
  configPath: string;
}
