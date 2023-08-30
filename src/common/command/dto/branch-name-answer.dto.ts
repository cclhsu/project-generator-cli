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

export class BranchNameAnswerDTO {
  constructor(branchName: string) {
    this.branchName = branchName;
  }

  @ApiProperty({
    description: 'The name of the branch.',
    example: 'feature/my-feature',
  })
  @IsString({ message: 'Branch name must be a string' })
  branchName: string;
}
