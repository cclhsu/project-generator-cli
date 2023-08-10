import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
// import { Transform, Type } from 'class-transformer';

export class PasswordAnswerDTO {
  constructor(password: string) {
    this.password = password;
  }
  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string;
}
