import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
// import { Transform, Type } from 'class-transformer';

export class SrcRootAnswerDto {
  constructor(srcRoot: string) {
    this.srcRoot = srcRoot;
  }
  @ApiProperty()
  @IsString()
  srcRoot: string;
}
