import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class DocumentFilePathAnswerDTO {
  constructor(documentFilePath: string) {
    this.documentFilePath = documentFilePath;
  }
  @ApiProperty()
  @IsString()
  documentFilePath: string;
}
