import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class ConfirmDeleteAnswerDTO {
  constructor(confirmDelete: boolean) {
    this.confirmDelete = confirmDelete;
  }
  @ApiProperty()
  @IsString()
  confirmDelete: boolean;
}
