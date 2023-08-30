import { ApiProperty } from '@nestjs/swagger';
import { Answers } from 'inquirer';
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

export const DATE_MSG: Answers = {
  regexp: /^\d{4}\/\d{2}\/\d{2}$/,
  regexp1: /^\d{2}\/\d{2}\/\d{4}$/,
  regexp2: /^\d{4}-\d{2}-\d{2}$/,
  regexp3:
    /^(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat) (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{2} \d{4} \d{2}:\d{2}:\d{2} (GMT|UTC)[+-]\d{4} \(.*\)$/,
  regexp4: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/,
  regexp5: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/,
  regexp6:
    /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}, (0?[1-9]|1[0-2]):[0-5][0-9]:[0-5][0-9] (AM|PM)$/,
  message: 'Date is Unique identifier in the format "12/01/2020".',
  example: 'e.g. 12/01/2020',
  typeMessage: 'Date must be a string',
  requiredMessage: 'Please enter an date',
  invalidMessage: 'Please enter a valid date',
  errorMessage:
    'Please enter a valid date format (e.g. YYYY/MM/DD, YYYY-MM-DD, MM/DD/YYYY, or a valid completed ate string)',
};

export class DateAnswerDTO {
  constructor(date: string | Date) {
    this.date = date;
  }

  @ApiProperty({
    description: DATE_MSG.message,
    example: DATE_MSG.example,
  })
  @Expose({ name: 'date', toPlainOnly: true })
  @IsNotEmpty({ message: DATE_MSG.requiredMessage })
  // @IsDate({ message: DATE_MSG.typeMessage })
  @IsDateString()
  date: string | Date;
}
