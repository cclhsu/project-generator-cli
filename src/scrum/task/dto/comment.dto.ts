import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsObject,
  IsString,
  MinLength,
  isObject,
} from 'class-validator';
import { Expose } from 'class-transformer';

export class CommentDTO {
  constructor(
    ID: string,
    content: string,
    createdBy: string,
    createdDate: Date,
    updatedBy: string,
    updatedDate: Date,
  ) {
    this.ID = ID;
    this.content = content;
    this.createdBy = createdBy;
    this.createdDate = createdDate;
    this.updatedBy = updatedBy;
    this.updatedDate = updatedDate;
  }

  @ApiProperty()
  @Expose({ name: 'ID', toPlainOnly: true })
  @IsString()
  ID: string;

  @ApiProperty()
  @Expose({ name: 'content', toPlainOnly: true })
  @IsString()
  content: string;

  @ApiProperty()
  @Expose({ name: 'createdBy', toPlainOnly: true })
  @IsString()
  createdBy: string;

  @ApiProperty()
  @Expose({ name: 'createdDate', toPlainOnly: true })
  @IsDateString()
  createdDate: Date;

  @ApiProperty()
  @Expose({ name: 'updatedBy', toPlainOnly: true })
  @IsString()
  updatedBy: string;

  @ApiProperty()
  @Expose({ name: 'updatedDate', toPlainOnly: true })
  @IsDateString()
  updatedDate: Date;
}
