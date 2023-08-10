import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
// import { Transform, Type } from 'class-transformer';

export class CreateTaskCommandOptionsDTO {
  constructor() {}

  // @ApiProperty()
  // @IsString()
  // UUID: string;
}
