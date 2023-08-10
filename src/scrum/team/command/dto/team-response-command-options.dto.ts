import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
// import { Transform, Type } from 'class-transformer';

export class TeamCommandOptionsDTO {
  constructor(UUID: string) {
    this.UUID = UUID;
  }

  @ApiProperty()
  @IsString()
  UUID: string;
}
