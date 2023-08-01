import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
// import { Transform, Type } from 'class-transformer';

export class UuidAnswerDto {
  constructor(UUID: string) {
    this.UUID = UUID;
  }
  @ApiProperty()
  @IsString()
  UUID: string;
}
