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
  Validate,
  ValidateNested,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { TaskMetadataDTO } from '../../task/dto/task-metadata.dto';
import { ColumnDTO } from './column.dto';
import { IdUuidStatusDTO } from '../../../common/dto';
import { IsArrayOfIdUuidDTO } from '../../../utils/decorator/IsArrayOfIdUuidDTO.decorator';

export class IterationContentDTO {
  constructor(
    description: string,
    goal: string,
    tasks: IdUuidStatusDTO[],
    columns: ColumnDTO<TaskMetadataDTO>[],
  ) {
    this.description = description;
    this.goal = goal;
    this.tasks = tasks;
    this.columns = columns;
  }

  @ApiProperty({
    description: 'Description of the iteration content.',
    example: 'Develop new feature set.',
  })
  @Expose({ name: 'description', toPlainOnly: true })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @ApiProperty({
    description: 'Goal of the iteration content.',
    example: 'Complete all user stories.',
  })
  @Expose({ name: 'goal', toPlainOnly: true })
  @IsString({ message: 'Goal must be a string' })
  // @MinLength(1, { message: 'Goal should not be empty' })
  goal: string;

  @ApiProperty({
    isArray: true,
    type: IdUuidStatusDTO,
    description: 'An array of IDs representing iteration tasks.',
    example: [
      {
        ID: 'PPP-0001',
        UUID: '00000000-0000-0000-0000-000000000001',
        status: 'TODO',
      },
      {
        ID: 'XYZ-0002',
        UUID: '00000000-0000-0000-0000-000000000002',
        status: 'IN_PROGRESS',
      },
    ],
  })
  @Expose({ name: 'tasks', toPlainOnly: true })
  @IsArray()
  @Validate(IsArrayOfIdUuidDTO)
  @IsObject({ each: true })
  tasks: IdUuidStatusDTO[];

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
