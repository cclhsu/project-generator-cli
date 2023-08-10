import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class ScrumMasterAnswerDTO {
  constructor(scrumMaster: string) {
    this.scrumMaster = scrumMaster;
  }
  @ApiProperty()
  @IsString()
  scrumMaster: string;
}
