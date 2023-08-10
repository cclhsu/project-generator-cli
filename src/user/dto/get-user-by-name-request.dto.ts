import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class GetUserByNameRequestDTO {
  constructor(name: string) {
    this.name = name;
  }
  @ApiProperty()
  @IsString()
  name: string;
}
