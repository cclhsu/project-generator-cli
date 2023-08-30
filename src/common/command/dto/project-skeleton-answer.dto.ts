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

export class ProjectSkeletonAnswerDTO {
  constructor(projectSkeleton: string) {
    this.projectSkeleton = projectSkeleton;
  }

  @ApiProperty({
    description: 'Name or identifier of the project skeleton.',
    example: 'basic-template',
  })
  @IsString({ message: 'Project skeleton must be a string.' })
  projectSkeleton: string;
}
