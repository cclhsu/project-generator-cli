import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
// import { Transform, Type } from 'class-transformer';

export class MetricCommandOptionsDTO {
  constructor(UUID: string) {
    this.UUID = UUID;
  }

  @ApiProperty()
  @IsString()
  UUID: string;
}
