import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class DocumentTypeAnswerDTO {
  constructor(documentType: string) {
    this.documentType = documentType;
  }
  @ApiProperty()
  @IsString()
  documentType: string;
}
