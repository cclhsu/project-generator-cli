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

export class AssigneeAnswerDTO {
  constructor(assignee: string) {
    this.assignee = assignee;
  }

  @ApiProperty({
    description: "The assignee's name.",
    minLength: 2, // Minimum length constraint
    maxLength: 50, // Maximum length constraint
    example: 'John Doe',
  })
  @Expose({ name: 'assignee', toPlainOnly: true })
  @IsString()
  @Length(2, 50, {
    message:
      'Assignee name must be between $constraint1 and $constraint2 characters.',
  })
  assignee: string;
}
