import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
// import { Transform, Type } from 'class-transformer';

export class TicketNumberAnswerDto {
  constructor(ticketNumber: string) {
    this.ticketNumber = ticketNumber;
  }
  @ApiProperty()
  @IsString()
  ticketNumber: string;
}
