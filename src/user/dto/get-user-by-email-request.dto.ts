import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class GetUserByEmailRequestDTO {
  constructor(email: string) {
    this.email = email;
  }
  @ApiProperty()
  @IsString()
  email: string;
}
