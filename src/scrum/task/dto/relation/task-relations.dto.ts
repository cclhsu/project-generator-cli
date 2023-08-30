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
import { IdUuidStatusDTO } from '../../../../common/dto';
import { IsArrayOfIdUuidDTO } from '../../../../utils/decorator/IsArrayOfIdUuidDTO.decorator';

export class TaskRelationsDTO {
  constructor(
    parent: string,
    subtasks: IdUuidStatusDTO[],
    predecessors: IdUuidStatusDTO[],
    successors: IdUuidStatusDTO[],
    relatedTasks: IdUuidStatusDTO[],
    blockedTasks: IdUuidStatusDTO[],
  ) {
    this.parent = parent;
    this.subtasks = subtasks;
    this.predecessors = predecessors;
    this.successors = successors;
    this.relatedTasks = relatedTasks;
    this.blockedTasks = blockedTasks;
  }

  @ApiProperty({
    description: 'ID of the parent task.',
    example: '00000000-0000-0000-0000-000000000000',
  })
  @Expose({ name: 'parent', toPlainOnly: true })
  @IsString({ message: 'parent must be a string' })
  @IsUUID('all', { message: 'Invalid UUID format' })
  parent: string;

  @ApiProperty({
    isArray: true,
    type: String,
    description: 'An array of IDs representing subtasks.',
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
  @Expose({ name: 'subtasks', toPlainOnly: true })
  @IsArray()
  @Validate(IsArrayOfIdUuidDTO)
  @IsObject({ each: true })
  subtasks: IdUuidStatusDTO[];

  @ApiProperty({
    isArray: true,
    type: String,
    description: 'An array of IDs representing predecessors.',
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
  @Expose({ name: 'predecessors', toPlainOnly: true })
  @IsArray()
  @Validate(IsArrayOfIdUuidDTO)
  @IsObject({ each: true })
  predecessors: IdUuidStatusDTO[];

  @ApiProperty({
    isArray: true,
    type: String,
    description: 'An array of IDs representing successors.',
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
  @Expose({ name: 'successors', toPlainOnly: true })
  @IsArray()
  @Validate(IsArrayOfIdUuidDTO)
  @IsObject({ each: true })
  successors: IdUuidStatusDTO[];

  @ApiProperty({
    isArray: true,
    type: String,
    description: 'An array of IDs representing related tasks.',
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
  @Expose({ name: 'relatedTasks', toPlainOnly: true })
  @IsArray()
  @Validate(IsArrayOfIdUuidDTO)
  @IsObject({ each: true })
  relatedTasks: IdUuidStatusDTO[];

  @ApiProperty({
    isArray: true,
    type: String,
    description: 'An array of IDs representing blocked tasks.',
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
  @Expose({ name: 'blockedTasks', toPlainOnly: true })
  @IsArray()
  @Validate(IsArrayOfIdUuidDTO)
  @IsObject({ each: true })
  blockedTasks: IdUuidStatusDTO[];
}
