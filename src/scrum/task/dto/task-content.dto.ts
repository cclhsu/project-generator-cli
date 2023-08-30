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
import { IdUuidDTO, NameUrlDTO } from '../../../common/dto';
import { TaskDescriptionStringDTO as TaskDescriptionDTO } from './description/task-description-string.dto';

export class TaskContentDTO {
  constructor(
    context: string,
    description: TaskDescriptionDTO,
    links: NameUrlDTO[],
    messages: IdUuidDTO[],
  ) {
    this.context = context;
    this.description = description;
    this.links = links;
    this.messages = messages;
  }

  @ApiProperty({
    description: 'Context of the task.',
    example: 'Develop new feature set.',
  })
  @Expose({ name: 'context', toPlainOnly: true })
  @IsString({ message: 'Context must be a string' })
  context: string;

  @ApiProperty({
    description: 'Description of the task.',
    type: TaskDescriptionDTO,
  })
  @Expose({ name: 'description', toPlainOnly: true })
  @IsObject()
  @Type(() => TaskDescriptionDTO)
  @ValidateNested({ each: true })
  description: TaskDescriptionDTO;

  @ApiProperty({
    description: 'Links to documentation related to the task.',
    type: [NameUrlDTO],
  })
  @Expose({ name: 'links', toPlainOnly: true })
  @IsArray()
  @IsOptional()
  links?: NameUrlDTO[];

  @ApiProperty({
    description: 'Messages associated with the task.',
    type: [IdUuidDTO],
  })
  @Expose({ name: 'messages', toPlainOnly: true })
  @IsArray()
  @IsOptional()
  messages?: IdUuidDTO[];
}
