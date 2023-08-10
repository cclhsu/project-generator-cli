import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class DocumentVariablesFilePathAnswerDTO {
  constructor(documentVariablesFilePath: string) {
    this.documentVariablesFilePath = documentVariablesFilePath;
  }
  @ApiProperty()
  @IsString()
  documentVariablesFilePath: string;
}
