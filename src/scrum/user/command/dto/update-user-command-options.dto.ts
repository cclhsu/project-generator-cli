import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
// import { Transform, Type } from 'class-transformer';

export class UpdateUserCommandOptionsDTO {
  constructor(UUID: string) {
    this.UUID = UUID;
  }

  @ApiProperty()
  @IsString()
  UUID: string;
}
