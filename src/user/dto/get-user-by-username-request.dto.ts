import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class GetUserByUsernameRequestDTO {
  constructor(username: string) {
    this.username = username;
  }
  @ApiProperty()
  @IsString()
  username: string;
}
