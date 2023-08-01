import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
// import { Transform, Type } from 'class-transformer';

export class ModuleNameAnswerDto {
  constructor(moduleName: string) {
    this.moduleName = moduleName;
  }
  @ApiProperty()
  @IsString()
  moduleName: string;
}
