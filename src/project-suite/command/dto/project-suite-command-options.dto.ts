import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsIn,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class ProjectSuiteCommandOptionsDTO {
  // @ApiProperty({
  //   description: 'The path to the configuration file.',
  //   example: '/path/to/config.json',
  // })
  // @IsString()
  // configPath: string;

  @ApiProperty({
    description: 'The path to the template file.',
    example: '/path/to/config.json',
  })
  @IsString()
  @IsOptional()
  templateRoot?: string;

  @ApiProperty()
  @IsString()
  projectSuiteVariablesFilePath?: string;

  @ApiProperty()
  @IsString()
  projectSuiteVariablesFileName?: string;

  @ApiProperty()
  @IsString()
  projectSuiteType?: string;

  @ApiProperty()
  @IsString()
  ProjectSuiteRootPath?: string;

  @ApiProperty()
  @IsString()
  projectSuiteGitProvider?: string;

  @ApiProperty()
  @IsString()
  projectSuiteName?: string;
}
