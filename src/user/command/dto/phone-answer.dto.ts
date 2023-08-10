import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class PhoneAnswerDTO {
  constructor(phone: string) {
    this.phone = phone;
  }
  @ApiProperty()
  @IsString()
  phone: string;
}
