import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
// import { Transform, Type } from 'class-transformer';

export class ConfirmDeleteAnswerDto {
  constructor(confirmDelete: boolean) {
    this.confirmDelete = confirmDelete;
  }
  @ApiProperty()
  @IsString()
  confirmDelete: boolean;
}
