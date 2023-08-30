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

export class DocumentCommandOptionsDTO {
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
  documentVariablesFilePath?: string;

  @ApiProperty()
  @IsString()
  documentVariablesFileName?: string;

  @ApiProperty()
  @IsString()
  documentType?: string;

  @ApiProperty()
  @IsString()
  documentFilePath?: string;

  @ApiProperty()
  @IsString()
  documentFileName?: string;
}
