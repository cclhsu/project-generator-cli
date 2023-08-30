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
import { MetricResponseDTO } from './metric-response.dto';

export class ListMetricResponseDTO {
  constructor(metrics: MetricResponseDTO[]) {
    this.metrics = metrics;
  }

  @ApiProperty({
    description: 'An array of iteration DTOs.',
    type: () => MetricResponseDTO,
    isArray: true,
  })
  @Expose({ name: 'metrics', toPlainOnly: true })
  @IsArray()
  @ValidateNested({ each: true })
  metrics: MetricResponseDTO[];
}
