import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class ProjectLanguageAnswerDTO {
  constructor(projectLanguage: string) {
    this.projectLanguage = projectLanguage;
  }
  @ApiProperty()
  @IsString()
  projectLanguage: string;
}
