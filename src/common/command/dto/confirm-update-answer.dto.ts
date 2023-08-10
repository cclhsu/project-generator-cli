import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class ConfirmUpdateAnswerDTO {
  constructor(confirmUpdate: boolean) {
    this.confirmUpdate = confirmUpdate;
  }
  @ApiProperty()
  @IsString()
  confirmUpdate: boolean;
}
