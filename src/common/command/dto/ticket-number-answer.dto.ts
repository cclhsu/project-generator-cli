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

export class TicketNumberAnswerDTO {
  constructor(ticketNumber: string) {
    this.ticketNumber = ticketNumber;
  }

  @ApiProperty({
    description: 'Ticket Number is Unique identifier in the format "PPP-XXXX".',
    example: 'ABC-1234',
  })
  @Expose({ name: 'ID', toPlainOnly: true })
  @IsString({ message: 'Ticket number must be a string.' })
  @Matches(/^[A-Z]{3}-\d{4}$/, {
    message: 'Ticket number should follow the format "PPP-XXXX".',
  })
  ticketNumber: string;
}
