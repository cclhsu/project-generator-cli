// user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty, IsUUID, IsIn } from 'class-validator';
import {
  PROJECT_STATUS_TYPE_ARRAY,
  DEFAULT_PROJECT_STATUS,
  PROJECT_STATUS_TYPES,
} from '../../../common/constant';

export class IterationIdUuidStatusDTO {
  constructor(ID: string, UUID: string, status: PROJECT_STATUS_TYPES) {
    this.ID = ID;
    this.UUID = UUID;
    this.status = status;
  }

  @ApiProperty({
    description: 'ID is Unique identifier for ' + IterationIdUuidStatusDTO.name,
    example: 'john.doe',
  })
  @Expose({ name: 'ID', toPlainOnly: true })
  @IsNotEmpty({ message: 'ID cannot be empty' })
  @IsString({ message: 'ID must be a string' })
  ID: string;

  @ApiProperty({
    description:
      'UUID is Unique identifier in the format "00000000-0000-0000-0000-000000000000"' +
      ' for  ' +
      IterationIdUuidStatusDTO.name,
    example: 'e.g. 00000000-0000-0000-0000-000000000000',
  })
  @Expose({ name: 'UUID', toPlainOnly: true })
  @IsNotEmpty({ message: 'Please enter an UUID' })
  @IsString({ message: 'UUID must be a string' })
  @IsUUID('all', {
    message:
      'Please enter a valid UUID format (e.g. 00000000-0000-0000-0000-000000000000)',
  })
  UUID: string;

  @ApiProperty({
    description:
      'The status of the project (PLANNED, IN_PROGRESS, or COMPLETED).',
    enum: PROJECT_STATUS_TYPE_ARRAY,
    example: DEFAULT_PROJECT_STATUS,
    nullable: false,
    type: 'string',
  })
  @IsString()
  @IsIn(PROJECT_STATUS_TYPE_ARRAY, {
    message: `Invalid project status. Possible values: ${PROJECT_STATUS_TYPE_ARRAY.join(
      ', ',
    )}`,
  })
  status: PROJECT_STATUS_TYPES;
}
