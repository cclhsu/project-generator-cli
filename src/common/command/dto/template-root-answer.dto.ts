import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
// import { Transform, Type } from 'class-transformer';

export class TemplateRootAnswerDto {
  constructor(templateRoot: string) {
    this.templateRoot = templateRoot;
  }
  @ApiProperty()
  @IsString()
  templateRoot: string;
}
