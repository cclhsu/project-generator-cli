import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
// import { Transform, Type } from 'class-transformer';

export class ConfirmUpdateAnswerDto {
  constructor(confirmUpdate: boolean) {
    this.confirmUpdate = confirmUpdate;
  }
  @ApiProperty()
  @IsString()
  confirmUpdate: boolean;
}
