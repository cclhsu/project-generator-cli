import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

export class ModuleNameAnswerDTO {
  constructor(moduleName: string) {
    this.moduleName = moduleName;
  }
  @ApiProperty()
  @IsString()
  moduleName: string;
}
