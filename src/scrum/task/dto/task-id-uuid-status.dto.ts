// user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty, IsUUID, Matches, IsEnum } from 'class-validator';
import {
  TASK_STATUS_TYPE_ARRAY,
  DEFAULT_TASK_STATUS,
  TASK_STATUS_TYPES,
} from '../../../common/constant';

export class TaskIdUuidStatusDTO {
  constructor(ID: string, UUID: string, status: TASK_STATUS_TYPES) {
    this.ID = ID;
    this.UUID = UUID;
    this.status = status;
  }

  @ApiProperty({
    description: 'ID is Unique identifier for ' + TaskIdUuidStatusDTO.name,
    example: 'PPP-0001',
  })
  @Expose({ name: 'ID', toPlainOnly: true })
  @IsString({ message: 'ID must be a string' })
  @Matches(/^[A-Z]{3}-\d{4}$/, {
    message: 'Ticket number should follow the format "PPP-XXXX".',
  })
  ID: string;

  @ApiProperty({
    description:
      'UUID is Unique identifier in the format "00000000-0000-0000-0000-000000000000"' +
      ' for  ' +
      TaskIdUuidStatusDTO.name,
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
    description: 'Task Status',
    example: TASK_STATUS_TYPE_ARRAY,
    type: [String],
    default: DEFAULT_TASK_STATUS,
  })
  @Expose({ name: 'taskStatus', toPlainOnly: true })
  @IsEnum(TASK_STATUS_TYPE_ARRAY, {
    message:
      'Invalid task status type. Allowed values: ' +
      TASK_STATUS_TYPE_ARRAY.join(', '),
    context: {
      reason: 'taskStatus',
    },
  })
  status: TASK_STATUS_TYPES;
}
