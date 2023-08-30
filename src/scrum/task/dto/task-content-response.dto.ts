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
import { TaskMetadataDTO } from './task-metadata.dto';
import { TaskContentDTO } from './task-content.dto';
import { UUID_MSG } from '../../../common/command/dto/uuid-answer.dto';

export class TaskContentResponseDTO {
  constructor(ID: string, UUID: string, content: TaskContentDTO) {
    this.ID = ID;
    this.UUID = UUID;
    this.content = content;
  }

  @ApiProperty({
    description: 'ID is Unique identifier for ' + TaskContentResponseDTO.name,
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
      TaskContentResponseDTO.name,
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

  @ApiProperty()
  @Expose({ name: 'content', toPlainOnly: true })
  @IsObject()
  @Type(() => TaskContentDTO)
  @ValidateNested({ each: true })
  content: TaskContentDTO;
}
