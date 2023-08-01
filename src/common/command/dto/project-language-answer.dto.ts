import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
// import { Transform, Type } from 'class-transformer';

export class ProjectLanguageAnswerDto {
  constructor(projectLanguage: string) {
    this.projectLanguage = projectLanguage;
  }
  @ApiProperty()
  @IsString()
  projectLanguage: string;
}
