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
import { IdUuidEntity, NameUrlEntity } from '../../../common/entity';
import { TaskDescriptionEntity } from './description/task-description-string.entity';

export class TaskContentEntity {
  constructor(
    context: string,
    description: TaskDescriptionEntity,
    links: NameUrlEntity[],
    messages: IdUuidEntity[],
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
    type: TaskDescriptionEntity,
  })
  @Expose({ name: 'description', toPlainOnly: true })
  @IsObject()
  @Type(() => TaskDescriptionEntity)
  @ValidateNested({ each: true })
  description: TaskDescriptionEntity;

  @ApiProperty({
    description: 'Links to documentation related to the task.',
    type: [NameUrlEntity],
  })
  @Expose({ name: 'links', toPlainOnly: true })
  @IsArray()
  @IsOptional()
  links?: NameUrlEntity[];

  @ApiProperty({
    description: 'Messages associated with the task.',
    type: [IdUuidEntity],
  })
  @Expose({ name: 'messages', toPlainOnly: true })
  @IsArray()
  @IsOptional()
  messages?: IdUuidEntity[];
}
