import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
// import { Transform, Type } from 'class-transformer';

export class EmailAnswerDTO {
  constructor(email: string) {
    this.email = email;
  }
  @ApiProperty()
  @IsEmail()
  email: string;
}
