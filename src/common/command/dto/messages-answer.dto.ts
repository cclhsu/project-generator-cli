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
import { MessageDTO } from '../../../scrum/message/dto';

export class MessagesAnswerDTO {
  constructor(messages: MessageDTO[]) {
    this.messages = messages;
  }

  @ApiProperty({
    description: 'An array of message DTOs.',
    type: () => MessageDTO,
    isArray: true,
  })
  @Expose({ name: 'messages', toPlainOnly: true })
  @IsArray({ message: 'Messages must be an array' })
  @ValidateNested({ each: true })
  messages: MessageDTO[];
}
