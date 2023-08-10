import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class DocumentFileNameAnswerDTO {
  constructor(documentFileName: string) {
    this.documentFileName = documentFileName;
  }
  @ApiProperty()
  @IsString()
  documentFileName: string;
}
