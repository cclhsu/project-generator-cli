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

export class ModuleNameAnswerDTO {
  constructor(moduleName: string) {
    this.moduleName = moduleName;
  }

  @ApiProperty({
    description: 'Name of the module',
    example: 'user-management',
  })
  @Expose({ name: 'moduleName', toPlainOnly: true })
  @IsString({ message: 'Module name must be a string' })
  @MinLength(3, { message: 'Module name must have at least 3 characters' })
  @MaxLength(50, { message: 'Module name cannot exceed 50 characters' })
  moduleName: string;
}
