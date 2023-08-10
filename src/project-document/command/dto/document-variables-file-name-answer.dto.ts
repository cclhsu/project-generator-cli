import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class DocumentVariablesFileNameAnswerDTO {
  constructor(documentVariablesFileName: string) {
    this.documentVariablesFileName = documentVariablesFileName;
  }
  @ApiProperty()
  @IsString()
  documentVariablesFileName: string;
}
