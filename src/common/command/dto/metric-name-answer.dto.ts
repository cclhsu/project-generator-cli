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

export const METRIC_NAME_MSG: Answers = {
  regexp: /^[A-Z][A-Za-z]+(: [A-Z][a-z]+)? Metric$/,
  message: 'Metric name is Unique identifier in the format "XYZ Metric".',
  example: 'e.g. XYZ Metric',
  typeMessage: 'Metric name must be a string',
  requiredMessage: 'Please enter an metric name',
  invalidMessage: 'Please enter a valid metric name',
  MinLengthMessage: 'Metric name must have at least 2 characters',
  MaxLengthMessage: 'Metric name cannot exceed 100 characters',
  errorMessage: 'Please enter a valid metric name format (e.g. XYZ Metric)',
};

export class MetricNameAnswerDTO {
  constructor(metricName: string) {
    this.metricName = metricName;
  }

  @ApiProperty({
    description: METRIC_NAME_MSG.message,
    example: METRIC_NAME_MSG.example,
  })
  @Expose({ name: 'metricName', toPlainOnly: true })
  @IsNotEmpty({ message: METRIC_NAME_MSG.requiredMessage })
  @IsString({ message: METRIC_NAME_MSG.typeMessage })
  @MinLength(2, { message: METRIC_NAME_MSG.MinLengthMessage })
  @MaxLength(100, { message: METRIC_NAME_MSG.MaxLengthMessage })
  @Matches(METRIC_NAME_MSG.regexp, {
    message: METRIC_NAME_MSG.errorMessage,
  })
  metricName: string;
}
