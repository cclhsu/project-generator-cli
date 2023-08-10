import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class SrcRootAnswerDTO {
  constructor(srcRoot: string) {
    this.srcRoot = srcRoot;
  }
  @ApiProperty()
  @IsString()
  srcRoot: string;
}
