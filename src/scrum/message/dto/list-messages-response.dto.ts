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
import { MessageResponseDTO } from './message-response.dto';

export class ListMessageResponseDTO {
  constructor(messages: MessageResponseDTO[]) {
    this.messages = messages;
  }

  @ApiProperty({
    description: 'An array of iteration DTOs.',
    type: () => MessageResponseDTO,
    isArray: true,
  })
  @Expose({ name: 'messages', toPlainOnly: true })
  @IsArray()
  @ValidateNested({ each: true })
  messages: MessageResponseDTO[];
}
