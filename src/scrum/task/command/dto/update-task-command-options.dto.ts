import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
// import { Transform, Type } from 'class-transformer';

export class UpdateTaskCommandOptionsDTO {
  constructor(UUID: string) {
    this.UUID = UUID;
  }

  @ApiProperty()
  @IsString()
  UUID: string;
}
