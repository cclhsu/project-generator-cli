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
import { ColumnDTO } from '../../../scrum/iteration/dto';
import { TaskMetadataDTO } from '../../../scrum/task/dto';

export class ColumnsAnswerDTO {
  constructor(columns: ColumnDTO<TaskMetadataDTO>[]) {
    this.columns = columns;
  }

  @ApiProperty({
    description: 'Columns of the iteration board.',
    type: [ColumnDTO],
  })
  @Expose({ name: 'columns', toPlainOnly: true })
  @IsArray({ message: 'Columns must be an array' })
  @Type(() => ColumnDTO)
  @ValidateNested({ each: true })
  columns: ColumnDTO<TaskMetadataDTO>[];
}
